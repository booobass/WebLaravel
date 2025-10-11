<?php

use App\Models\Album;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

it('can create an album with songs', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->postJson('/api/album/store', [
        'title' => 'test album',
        'image' => UploadedFile::fake()->image('test.jpg'),
        'songs' => [
            ['title' => 'track one', 'track_number' => 1],
            ['title' => 'track two', 'track_number' => 2]
        ]
    ]);


    $response->assertStatus(201);
    $response->assertJsonStructure([
        'album' => [
            'id',
            'title',
            'image',
            'songs' => [
                ['id', 'title', 'track_number']
            ]
        ]
    ]);

    $album = Album::first();

    Storage::disk('public')->assertExists('images/' . $album->image);
});
