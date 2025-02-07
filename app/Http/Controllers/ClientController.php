<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules\Phone;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
        {
        return Inertia::render('Clients/Index', [
            'clients' => Client::where('user_id', Auth::id())
                ->select('id', 'user_id', 'firstName', 'lastName', 'email', 'phone', 'created_at')
                ->with(['notes' => function($query) {
                    $query->select('id', 'client_id', 'title', 'note', 'created_at')
                        ->where('status', 'active')
                        ->latest();
                }])
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'note' => 'nullable|string',
            'noteTitle' => 'nullable|string|max:255',
        ]);
    
        // Add user_id to the validated data
        $clientData = array_merge($validated, [
            'user_id' => Auth::id()
        ]);
    
        // Remove note from client creation data
        unset($clientData['note']);
    
        $client = Client::create($clientData);
    
        // Create note if provided
        if (!empty($validated['note'])) {
            $client->notes()->create([
                'user_id' => Auth::id(),
                'title' => $validated['noteTitle'],
                'note' => $validated['note']
            ]);
        }

        return redirect()->route('clients.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client): RedirectResponse
    {
        Gate::authorize('update', $client);
 
        $validated = $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'nullable|email',
            'phone' => 'nullable|phone:US,mobile',
        ]);
 
        $client->update($validated);
 
        return redirect(route('clients.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client): RedirectResponse
    {
        Gate::authorize('delete', $client);

        $client->delete();

        return redirect(route('clients.index'));
    }
}
