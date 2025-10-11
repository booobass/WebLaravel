<?php

use App\Models\Track;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

it('allows authenticated user to upload a track', function () {
    Storage::fake('public');

    $user = User::factory()->create();
    $this->actingAs($user);

    $file = UploadedFile::fake()->create('test.mp3', 1024, 'audio/mpeg');

    $response = $this->postJson('/api/track/store', [
        'name' => 'test track',
        'describe' => 'description',
        'audio_path' => $file
    ]);

    $response->assertStatus(201)->assertJsonStructure([
        'track' => ['id', 'user_id', 'name', 'describe', 'audio_path']
    ]);

    $this->assertDatabaseHas('tracks', [
        'name' => 'test track',
        'describe' => 'description',
        'user_id' => $user->id
    ]);

    $track = Track::first();
    Storage::disk('public')->assertExists('tracks/' . $track->audio_path);
});
