<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\PlayerMatchReview;

class PlayerMatchReviewController extends Controller
{
    // GET /player-match-reviews?match_id=&player_id=&page=&per_page=
    public function index(Request $request)
    {
        $query = PlayerMatchReview::query();
        if ($request->has('match_id')) {
            $query->where('match_id', $request->match_id);
        }
        if ($request->has('player_id')) {
            $query->where('player_id', $request->player_id);
        }
        $perPage = $request->input('per_page', 10);
        $reviews = $query->orderByDesc('created_at')->paginate($perPage);
        return response()->json($reviews);
    }

    // POST /player-match-reviews (media or admin)
    public function store(Request $request)
    {
        $user = Auth::user();
        $this->authorizeMediaOrAdmin($user);
        $request->validate([
            'match_id' => 'required|exists:matches,match_id',
            'player_id' => 'required|exists:players,player_id',
            'comment' => 'required|string',
        ]);
        // Only one review per user/player/match
        $existing = PlayerMatchReview::where('user_id', $user->user_id)
            ->where('player_id', $request->player_id)
            ->where('match_id', $request->match_id)
            ->first();
        if ($existing) {
            return response()->json(['message' => 'You have already reviewed this player for this match.'], 409);
        }
        $review = PlayerMatchReview::create([
            'user_id' => $user->user_id,
            'player_id' => $request->player_id,
            'match_id' => $request->match_id,
            'comment' => $request->comment,
        ]);
        return response()->json($review, 201);
    }

    // PUT /player-match-reviews/{id} (media owner or admin)
    public function update($id, Request $request)
    {
        $user = Auth::user();
        $review = PlayerMatchReview::findOrFail($id);
        if ($user->user_id !== $review->user_id && !$this->isAdmin($user)) {
            abort(403, 'Forbidden');
        }
        $request->validate([
            'comment' => 'required|string',
        ]);
        $review->update($request->only(['comment']));
        return response()->json($review);
    }

    // DELETE /player-match-reviews/{id} (admin only)
    public function destroy($id)
    {
        $user = Auth::user();
        if (!$this->isAdmin($user)) {
            abort(403, 'Admin only.');
        }
        $review = PlayerMatchReview::findOrFail($id);
        $review->delete();
        return response()->json(['message' => 'Review deleted.']);
    }

    protected function authorizeMediaOrAdmin($user)
    {
        if (!$user || (!$user->roles()->where('role_name', 'scout')->exists() && !$this->isAdmin($user))) {
            abort(403, 'Scout or admin only.');
        }
    }

    protected function isAdmin($user)
    {
        return $user && $user->roles()->where('role_name', 'admin')->exists();
    }
} 