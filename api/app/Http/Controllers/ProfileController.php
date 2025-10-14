<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $profiles = Profile::where('user_id', Auth::id())->get();

        return response()->json(['profiles' => $profiles]);
    }

    public function userProfiles($slug)
    {
        $user = User::where('slug', $slug)->firstOrFail();

        $profiles = Profile::where('user_id', $user->id)->get();

        return response()->json([
            'user' => $user->only(['id', 'slug']),
            'profiles' => $profiles
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
        $user = Auth::user();

        if($user->profile) {
            return response()->json(['message' => 'プロフィールは作成済みです'], 400);
        }

        $validated = $request->validate([
            'homepage_name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'background_color' => ['required', 'string', 'regex:/^#[0-9a-fA-F]{6}$/']
        ]);

        $profile = new Profile($validated);
        $profile->user_id = Auth::id();
        $profile->save();

        return response()->json(['profiile' => $profile], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Profile $profile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Profile $profile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Profile $profile)
    {
        $validated = $request->validate([
            'homepage_name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'background_color' => ['required', 'string', 'regex:/^#[0-9a-fA-F]{6}$/']
        ]);

        $profile->update($validated);

        return response()->json(['profile' => $profile], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Profile $profile)
    {
        //
    }
}
