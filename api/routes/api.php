<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\GigController;
use App\Http\Controllers\TrackController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]); // CSRFチェックを無効化

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/album/store', [AlbumController::class, 'store']);
    Route::get('/albums', [AlbumController::class, 'index']);
    Route::post('/track/store', [TrackController::class, 'store']);
    Route::get('/tracks', [TrackController::class, 'index']);
    Route::post('/gig/store', [GigController::class, 'store']);
});

Route::get('/uuu/{slug}/albums', [AlbumController::class, 'userAlbums']);
Route::get('/uuu/{slug}/tracks', [TrackController::class, 'userTracks']);
