<?php

namespace App\Http\Controllers;

use App\Models\Gig;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GigController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gigs = Gig::where('user_id', Auth::id())
            ->with(['bands', 'djs'])
            ->orderBy('date')
            ->get();

        return response()->json(['gigs' => $gigs]);

    }

    public function userGigs($slug)
    {
        $user = User::where('slug', $slug)->firstOrFail();

        $gigs = Gig::where('user_id', $user->id)
            ->with(['bands', 'djs'])
            ->orderBy('date')
            ->get();

        return response()->json([
            'user' => $user->only(['id', 'slug']),
            'gigs' => $gigs
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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'place' => ['required', 'string', 'max:255'],
            'open_time' => ['required', 'date_format:H:i'],
            'start_time' => ['required', 'date_format:H:i'],
            'adv_price' => ['required', 'integer'],
            'day_price' => ['required', 'integer'],
            'bands' => ['required', 'array', 'min:1'],
            'bands.*.name' => ['required', 'string', 'max:255'],
            'djs' => ['nullable', 'array'],
            'djs.*.name' => ['nullable', 'string', 'max:255']
        ]);

        $gig = new Gig($validated);
        $gig->user_id = Auth::id();
        $gig->save();

        $gig->bands()->createMany($validated['bands']);

        if (!empty($validated['djs'])) {
            $gig->djs()->createMany($validated['djs']);
        }

        return response()->json([
            'gig' => $gig->load(['bands', 'djs'])
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Gig $gig)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gig $gig)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gig $gig)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gig $gig)
    {
        //
    }
}
