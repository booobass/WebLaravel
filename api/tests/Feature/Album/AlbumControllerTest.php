<?php

use App\Models\Album;
use App\Models\Song;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

beforeEach(function () {
    Storage::fake('public');
    $this->user = User::factory()->create();
    $this->actingAs($this->user, 'sanctum');
});

test('user can create an album with songs and image', function () {
    $file = UploadedFile::fake()->image('album.jpg');

    $payload = [
        'title' => 'テストアルバム',
        'image' => $file,
        'songs' => [
            ['title' => 'Song 1', 'track_number' => 1],
            ['title' => 'Song 2', 'track_number' => 2],
        ]
    ];

    $response = $this->postJson('/api/album/store', $payload);

    $response->assertStatus(201);

    $this->assertDatabaseHas('albums', [
        'title' => 'テストアルバム',
        'user_id' => $this->user->id
    ]);

    $album = Album::first();
    expect($album->songs)->toHaveCount(2);
    Storage::disk('public')->assertExists('images/' . $album->image);
});

test('fails to create album with invalid data', function () {
    $response = $this->postJson('api/album/store', [
        'title' => '',
        'songs' => [['title' => '', 'track_number' => 'abc']]
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors([
        'title',
        'songs.0.title',
        'songs.0.track_number'
    ]);
});

test('user can get their own albums', function () {
    $album1 = Album::factory()->for($this->user)->create();
    $album2 = Album::factory()->for($this->user)->create();

    Song::factory()->for($album1)->count(2)->create();

    $response = $this->getJson('/api/albums');

    $response->assertStatus(200);
    $response->assertJsonCount(2, 'albums');
});

test('can get albums by user slug', function () {
    $user = User::factory()->create(['slug' => 'test-user']);
    $album = Album::factory()->for($user)->create();

    $response = $this->getJson("/api/uuu/{$user->slug}/albums");
    $response->assertStatus(200);
    $response->assertJsonPath('user.slug', 'test-user');
});

test('user can update album and replace image', function () {
    $album = Album::factory()->for($this->user)->create([
        'image' => 'old.jpg',
        'title' =>'旧タイトル'
    ]);

    Storage::disk('public')->put('images/old.jpg', 'dummy content');

    $file = UploadedFile::fake()->image('new.jpg');

    $payload = [
        'title' => '新タイトル',
        'image' => $file,
        'songs' => [['title' => 'New Song', 'track_number' => 1]]
    ];

    $response = $this->patchJson("/api/album/{$album->id}", $payload);
    $response->assertStatus(200);

    $album->refresh();

    expect($album->title)->toBe('新タイトル');
    expect($album->songs)->toHaveCount(1);
    Storage::disk('public')->assertMissing(('images/old.jpg'));
    Storage::disk('public')->assertExists(('images/' . $album->image));
});

test('user can delete album and its image and songs', function () {
    $album = Album::factory()->for($this->user)->create(['image' => 'test.jpg']);
    Storage::disk('public')->put('images/test.jpg', 'dummy content');
    Song::factory()->for($album)->count(2)->create();

    $response = $this->deleteJson("/api/album/{$album->id}");
    $response->assertStatus(200);

    $this->assertDatabaseMissing('albums', ['id' => $album->id]);
    Storage::disk('public')->assertMissing('images/test.jpg');
});
