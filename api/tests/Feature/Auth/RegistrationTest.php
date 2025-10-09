<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

it('can register a user', function () {
    $response = $this->postJson('/api/register', [
        'name' => 'testname',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'slug' => 'test_abc'
    ]);

    $response->assertStatus(201)->assertJsonStructure([
        'user' => ['id', 'name', 'email', 'slug'],
        'token'
    ]);

    $this->assertDatabaseHas('users', [
        'email' => 'test@example.com'
    ]);
});

it('cannot register with invalid data', function () {
    $response = $this->postJson('/api/register', [
        'name' => '',
        'email' => 'not-an-email',
        'password' => 'short',
        'slug' => ''
    ]);

    $response->assertStatus(422);
});
