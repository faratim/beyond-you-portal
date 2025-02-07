<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        // You might want to filter by client_id if provided
        $notes = Note::query()
            ->when($request->client_id, function ($query, $clientId) {
                return $query->where('client_id', $clientId);
            })
            ->with(['user', 'client']) // Eager load relationships
            ->latest()
            ->paginate(15);

        return response()->json($notes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'referral_id' => 'nullable|exists:referrals,id',
            'title' => 'nullable|string|max:255',
            'note' => 'required|string',
            'visibility' => 'nullable|in:standard,private,shared',
        ]);

        $note = Note::create([
            ...$validated,
            'user_id' => auth()->id(),
            'status' => 'active'
        ]);

        return response()->json($note->load(['user', 'client']), 201);
    }

    public function show(Note $note)
    {
        // You might want to add authorization here
        // to check if the user can view this note
        return response()->json($note->load(['user', 'client']));
    }

    public function update(Request $request, Note $note)
    {
        // You might want to add authorization here
        // to check if the user can edit this note
        
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'note' => 'required|string',
            'visibility' => 'nullable|in:standard,private,shared',
            'status' => 'nullable|in:active,archived,deleted',
        ]);

        $note->update($validated);

        return response()->json($note->fresh()->load(['user', 'client']));
    }

    public function destroy(Note $note)
    {
        // You might want to add authorization here
        // to check if the user can delete this note
        
        // Soft delete by updating status
        $note->update(['status' => 'deleted']);
        // Or hard delete if preferred:
        // $note->delete();

        return response()->json(null, 204);
    }

    // Additional useful methods:

    public function clientNotes(Request $request, $clientId)
    {
        $notes = Note::where('client_id', $clientId)
            ->where('status', 'active')
            ->with(['user'])
            ->latest()
            ->paginate(15);

        return response()->json($notes);
    }

    public function restoreNote(Note $note)
    {
        // For restoring "deleted" notes
        $note->update(['status' => 'active']);

        return response()->json($note->fresh()->load(['user', 'client']));
    }
}