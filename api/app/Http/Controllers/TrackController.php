<?php

namespace App\Http\Controllers;

use App\Models\Track;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TrackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tracks = Track::where('user_id', Auth::id())->latest()->get();

        return response()->json(['tracks' => $tracks]);
    }

    public function userTracks($slug)
    {
        $user = User::where('slug', $slug)->firstOrFail();

        $tracks = Track::where('user_id', $user->id)->latest()->get();

        return response()->json([
            'user' => $user->only(['id', 'slug']),
            'tracks' => $tracks
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
        $user = $request->user();
        $trackCount = $user->tracks()->count();

        if ($trackCount >= 3) {
            return response()->json([
                'message' => '3曲までしか登録できません'
            ], 403);
        }
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'describe' => ['required', 'string', 'max:255'],
            'audio_path' => ['required', 'file', 'mimes:mp3,wav,m4a', 'max:8480'] //8MBまで
        ]);

        $path = $request->file('audio_path')->store('tracks', 'public');
        $validated['audio_path'] = basename($path);

        $track = new Track($validated);
        $track->user_id = Auth::user()->id;
        $track->save();

        return response()->json(['track' => $track], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Track $track)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Track $track)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Track $track)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'describe' => ['required', 'string', 'max:255'],
            'audio_path' => ['nullable', 'file', 'mimes:mp3,wav,m4a', 'max:8480']
        ]);

        if ($request->hasFile('audio_path')) {
            if($track->audio_path && Storage::disk('public')->exists('tracks/' . $track->audio_path)) {
                Storage::disk('public')->delete('tracks/' . $track->audio_path);
            }

            $path = $request->file('audio_path')->store('tracks', 'public');
            $validated['audio_path'] = basename($path);
        } else {
            $validated['audio_path'] = $track->audio_path;
        }

        $track->update([
            'name' => $validated['name'],
            'describe' => $validated['describe']
        ]);

        return response()->json(['track' => $track], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Track $track)
    {
        Storage::disk('public')->delete('tracks/' . $track->audio_path);

        $track->delete();

        return response()->json(['message' => '音源を削除しました'], 200);
    }
}
