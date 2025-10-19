<?php

use App\Models\Gig;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user, 'sanctum');
});

test('user can create an gig with bands and djs', function() {

    $payload = [
        'date' => '2025-10-19',
        'place' => 'Tokyo',
        'open_time' => '18:00',
        'start_time' => '18:30',
        'adv_price' => 3000,
        'day_price' => 4000,
        'bands' => [
            ['name' => 'The Test'],
            ['name' => 'The Pest']
        ],
        'djs' => [
            ['name' => 'Dj Assert']
        ]
    ];

    $response = $this->postJson('/api/gig/store', $payload);

    $response->assertStatus(201);
    $response->assertJsonStructure(['gig' => ['id', 'bands', 'djs']]);

    $this->assertDatabaseHas('gigs', [
        'place' => 'Tokyo',
        'user_id' => $this->user->id
    ]);

    $gig = Gig::with(['bands', 'djs'])->first();
    expect($gig->bands)->toHaveCount(2);
    expect($gig->djs)->toHaveCount(1);
});

test('user can fetch own gigs', function () {
    Gig::factory()->for($this->user)->count(2)->create();

    $response = $this->getJson('/api/gigs');

    $response->assertStatus(200);
    $response->assertJsonStructure(['gigs']);
    // $response->assertJsonCount(2, 'gigs');
    expect($response['gigs'])->toHaveCount(2);
});

test('can fetch gigs of another user by slug', function () {
    $user = User::factory()->create(['slug' => 'test-user']);
    Gig::factory()->for($user)->count(3)->create();

    $response = $this->getJson("/api/uuu/{$user->slug}/gigs");

    $response->assertStatus(200);
    $response->assertJsonStructure(['user', 'gigs']);
    $response->assertJsonCount(3, 'gigs');
});

test('user can update a gig with new data', function () {
    $gig = Gig::factory()->for($this->user)->create([
        'date' => '2025-10-19',
        'place' => 'Tokyo',
        'open_time' => '18:00',
        'start_time' => '18:30',
        'adv_price' => 3000,
        'day_price' => 4000,
    ]);
    $gig->bands()->create(['name' => 'Old Band']);
    $gig->djs()->create(['name' => 'Old Dj']);

    $payload = [
        'date' => '2025-11-01',
        'place' => 'Osaka',
        'open_time' => '17:00',
        'start_time' => '17:30',
        'adv_price' => 2800,
        'day_price' => 3300,
        'bands' => [
            ['name' => 'New Band 1'],
            ['name' => 'New Band 2']
        ],
        'djs' => [
            ['name' => 'New DJ']
        ]
    ];

    $response = $this->patchJson("/api/gig/{$gig->id}", $payload);

    $response->assertStatus(200)
        ->assertJsonPath('gig.place', 'Osaka');

    $updatedGig = Gig::with(['bands', 'djs'])->find($gig->id);
    expect($updatedGig->bands)->toHaveCount(2);
    expect($updatedGig->djs)->toHaveCount(1);
});

test('user can delete a gig', function () {
    $gig = Gig::factory()->for($this->user)->create();
    $gig->bands()->create(['name' => 'The Test']);
    $gig->djs()->create(['name' => 'Dj Assert']);

    $response = $this->deleteJson("/api/gig/{$gig->id}");

    $response->assertStatus(200)
        ->assertJson(['message' => 'ライブ情報を削除しました']);

    $this->assertDatabaseMissing('gigs', ['id' => $gig->id]);
});
