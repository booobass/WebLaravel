<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AlbumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $albums = Album::Where('user_id', Auth::id())
            ->with('songs')
            ->latest()
            ->get();

        return response()->json(['albums' => $albums]);
    }

    public function userAlbums($slug)
    {
        $user = User::where('slug', $slug)->firstOrFail();

        $albums = Album::where('user_id', $user->id)
            ->with('songs')
            ->oldest()
            ->get();

        return response()->json([
            'user' => $user->only(['id', 'slug']),
            'albums' => $albums
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
            'title' => ['required', 'string', 'max:255'],
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], //2MBまで
            'songs' => ['array'],
            'songs.*.title' => ['required', 'string', 'max:255'],
            'songs.*.track_number' => ['required', 'integer', 'min:1']
        ]);

        $path = $request->file('image')->store('images', 's3'); //store()でファイル名はランダムな４０文字のハッシュ値に置き換えられる
        $validated['image'] = $path;

        $album = new Album($validated);
        $album->user_id = Auth::user()->id;
        $album->save();

        foreach($request->input('songs') as $songData) {
            $album->songs()->create([
                'title' => $songData['title'],
                'track_number' => $songData['track_number']
            ]);
        }

        $album->image_url = $album->image ? Storage::disk('s3')->url($album->image) : null;

        return response()->json(['album' => $album->load('songs')], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Album $album)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Album $album)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Album $album)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'songs' => ['array'],
            'songs.*.title' => ['required', 'string', 'max:255'],
            'songs.*.track_number' => ['required', 'integer', 'min:1']
        ]);

        if ($request->hasFile('image')) {
            if($album->image && Storage::disk('s3')->exists($album->image)) {
                Storage::disk('s3')->delete($album->image);
            }

            $path = $request->file('image')->store('images', 's3');
            $validated['image'] = $path;
        } else {
            $validated['image'] = $album->image;
        }

        $album->update([
            'title' => $validated['title'],
            'image' => $validated['image'],
        ]);

        $album->songs()->delete();

        foreach ($request->input('songs') as $songData) {
            $album->songs()->create([
                'title' => $songData['title'],
                'track_number' => $songData['track_number']
            ]);
        }

        $album->image_url = $album->image ? Storage::disk('s3')->url($album->image) : null;

        return response()->json(['album' => $album->load('songs')], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Album $album)
    {
        Storage::disk('s3')->delete($album->image);

        $album->songs()->delete();

        $album->delete();

        return response()->json(['message' => 'アルバムを削除しました'], 200);
    }
}
