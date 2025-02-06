<?php

namespace App\Http\Controllers;

use App\Models\Referral;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Inertia\RedirectResponse;
use App\Models\User;
use App\Models\Client;
use Illuminate\Support\Facades\Auth;

class ReferralController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Referral/Index', [
            'referrals' => Referral::where('referred_by', Auth::id())
                ->with('client', 'user')
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Referral/Create', [
            'coaches' => User::where('is_coach', true)
                ->where('is_active', true)
                ->where('id', '!=', Auth::id())
                ->get(['id', 'firstName', 'lastName']),
            'clients' => Client::where('user_id', auth()->id())
                              ->select('id', 'user_id', 'firstName', 'lastName', 'email', 'phone', 'created_at')
                              ->latest()
                              ->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'coach_id' => 'required|exists:users,id',
            'client_id' => 'required|exists:clients,id',
        ]);
    
        $referral = Referral::create([
            'user_id' => $validated['coach_id'],
            'referred_by' => Auth::id(),
            'client_id' => $validated['client_id'],
        ]);
    
        return redirect(route('refer.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Referral $referral)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Referral $referral)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Referral $referral)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Referral $referral)
    {
        //
    }
}
