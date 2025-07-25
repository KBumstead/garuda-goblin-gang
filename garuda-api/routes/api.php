<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\TrainerController;
use App\Http\Controllers\TrainingProgramController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\PlayerMatchStatsController;
use App\Http\Controllers\PlayerGeneralReviewController;
use App\Http\Controllers\PlayerMatchReviewController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
});

Route::get('/players', [PlayerController::class, 'index']);
Route::get('/players/ranking', [PlayerController::class, 'ranking']);
Route::get('/players/{id}', [PlayerController::class, 'show']);
Route::get('/players/{id}/reviews', [PlayerController::class, 'reviews']);

Route::get('/matches/upcoming', [MatchController::class, 'upcoming']);
Route::get('/matches', [MatchController::class, 'index']);

Route::get('/trainers', [TrainerController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/trainers', [TrainerController::class, 'store']);
    Route::put('/trainers/{id}', [TrainerController::class, 'update']);
});

Route::get('/training-programs', [TrainingProgramController::class, 'index']);
Route::get('/training-programs/{id}', [TrainingProgramController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/training-programs', [TrainingProgramController::class, 'store']);
    Route::put('/training-programs/{id}', [TrainingProgramController::class, 'update']);
});

Route::get('/schools', [SchoolController::class, 'index']);
Route::get('/schools/{id}', [SchoolController::class, 'show']);
Route::get('/clubs', [ClubController::class, 'index']);
Route::get('/clubs/{id}', [ClubController::class, 'show']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/schools', [SchoolController::class, 'store']);
    Route::put('/schools/{id}', [SchoolController::class, 'update']);
    Route::post('/schools/{id}/assign-player', [SchoolController::class, 'assignPlayer']);
    Route::post('/clubs', [ClubController::class, 'store']);
    Route::put('/clubs/{id}', [ClubController::class, 'update']);
    Route::post('/clubs/{id}/assign-player', [ClubController::class, 'assignPlayer']);
});

Route::get('/player-match-stats', [PlayerMatchStatsController::class, 'show']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/player-match-stats', [PlayerMatchStatsController::class, 'store']);
    Route::put('/player-match-stats', [PlayerMatchStatsController::class, 'update']);
});

Route::get('/player-general-reviews', [PlayerGeneralReviewController::class, 'index']);
Route::get('/player-match-reviews', [PlayerMatchReviewController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/player-general-reviews', [PlayerGeneralReviewController::class, 'store']);
    Route::put('/player-general-reviews/{id}', [PlayerGeneralReviewController::class, 'update']);
    Route::post('/player-match-reviews', [PlayerMatchReviewController::class, 'store']);
    Route::put('/player-match-reviews/{id}', [PlayerMatchReviewController::class, 'update']);
});

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/players', [PlayerController::class, 'store']);
    Route::put('/players/{id}/stats', [PlayerController::class, 'updateStats']);
    Route::delete('/players/{id}', [PlayerController::class, 'destroy']);
    Route::post('/matches', [MatchController::class, 'store']);
    Route::put('/matches/{id}', [MatchController::class, 'update']);
    Route::delete('/matches/{id}', [MatchController::class, 'destroy']);
    Route::delete('/trainers/{id}', [TrainerController::class, 'destroy']);
    Route::delete('/training-programs/{id}', [TrainingProgramController::class, 'destroy']);
    Route::delete('/player-general-reviews/{id}', [PlayerGeneralReviewController::class, 'destroy']);
    Route::delete('/player-match-reviews/{id}', [PlayerMatchReviewController::class, 'destroy']);
});
