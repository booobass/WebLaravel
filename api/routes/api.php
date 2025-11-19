<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\GigController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\TrackController;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/csrf-token', function () {
//     $token = csrf_token();
//     return response()->json(['csrf_token' => $token]);
// });

Route::get('/csrf-token', function (Request $request) {
    return response()->json(['csrfToken' => csrf_token()]);
});

Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest');
    // ->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]); // CSRFチェックを無効化

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
    Route::patch('/album/{album}', [AlbumController::class, 'update']);
    Route::delete('/album/{album}', [AlbumController::class, 'destroy']);
    Route::post('/track/store', [TrackController::class, 'store']);
    Route::get('/tracks', [TrackController::class, 'index']);
    Route::patch('/track/{track}', [TrackController::class, 'update']);
    Route::delete('/track/{track}', [TrackController::class, 'destroy']);
    Route::post('/gig/store', [GigController::class, 'store']);
    Route::get('/gigs', [GigController::class, 'index']);
    Route::patch('/gig/{gig}', [GigController::class, 'update']);
    Route::delete('/gig/{gig}', [GigController::class, 'destroy']);
    Route::post('/profile/store', [ProfileController::class, 'store']);
    Route::get('/profiles', [ProfileController::class, 'index']);
    Route::patch('/profile/{profile}', [ProfileController::class, 'update']);
});

Route::get('/uuu/{slug}/albums', [AlbumController::class, 'userAlbums']);
Route::get('/uuu/{slug}/tracks', [TrackController::class, 'userTracks']);
Route::get('/uuu/{slug}/gigs', [GigController::class, 'userGigs']);
Route::get('/uuu/{slug}/profiles', [ProfileController::class, 'userProfiles']);

Route::get('/view-image/{filename}', function ($filename) {
    // ファイルが存在するか確認
    if (! Storage::disk('public')->exists($filename)) {
        abort(404);
    }

    // ファイルを読み込み
    $file = Storage::disk('public')->get($filename);

    // MIMEタイプを推測
    $type = Storage::disk('public')->mimeType($filename);

    // MIMEタイプとファイル内容をレスポンスとして返す
    return Response::make($file, 200)->header('Content-Type', $type);

})->name('view.image');
