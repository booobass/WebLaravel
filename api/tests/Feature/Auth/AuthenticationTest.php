<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

it('can login and return token', function () {
    $user = User::factory()->create([
        'password' => bcrypt('password')
    ]);

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'password'
    ]);

    $response->assertStatus(200)->assertJsonStructure([
        'user' => ['id', 'name', 'email', 'slug'],
        'token'
    ]);

    $this->assertAuthenticatedAs($user);
});

it('cannot login with invalid credentials', function () {

    $user = User::factory()->create([
        'password' => bcrypt('password')
    ]);

    $response = $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'wrong-password'
    ]);

    $response->assertStatus(401);
    $this->assertGuest();
});

it('can logout and revoke token', function () {

    $user = User::factory()->create();
    $token = $user->createToken('authToken')->plainTextToken;

    $response = $this->withHeader('Authorization', 'Bearer ' . $token)->postJson('/api/logout');

    $response->assertStatus(200)->assertJson(['message' => 'ログアウトしました']);

    $this->assertDatabaseMissing('personal_access_tokens', [
        'tokenable_id' => $user->id
    ]);
});
