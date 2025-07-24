<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\PlayerGeneralReview;
use App\Models\Player;

class PlayerGeneralReviewController extends Controller
{
    // GET /player-general-reviews?player_id=&page=&per_page=
    public function index(Request $request)
    {
        $request->validate([
            'player_id' => 'required|exists:players,player_id',
        ]);
        $perPage = $request->input('per_page', 10);
        $reviews = PlayerGeneralReview::where('player_id', $request->player_id)
            ->orderByDesc('created_at')
            ->paginate($perPage);
        return response()->json($reviews);
    }

    // POST /player-general-reviews (media or admin)
    public function store(Request $request)
    {
        $user = Auth::user();
        $this->authorizeMediaOrAdmin($user);
        $request->validate([
            'player_id' => 'required|exists:players,player_id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);
        // Only one review per user/player
        $existing = PlayerGeneralReview::where('user_id', $user->user_id)
            ->where('player_id', $request->player_id)
            ->first();
        if ($existing) {
            return response()->json(['message' => 'You have already reviewed this player.'], 409);
        }
        $review = PlayerGeneralReview::create([
            'user_id' => $user->user_id,
            'player_id' => $request->player_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);
        $this->updatePlayerOverallRating($request->player_id);
        return response()->json($review, 201);
    }

    // PUT /player-general-reviews/{id} (media owner or admin)
    public function update($id, Request $request)
    {
        $user = Auth::user();
        $review = PlayerGeneralReview::findOrFail($id);
        if ($user->user_id !== $review->user_id && !$this->isAdmin($user)) {
            abort(403, 'Forbidden');
        }
        $request->validate([
            'rating' => 'sometimes|required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);
        $review->update($request->only(['rating', 'comment']));
        $this->updatePlayerOverallRating($review->player_id);
        return response()->json($review);
    }

    // DELETE /player-general-reviews/{id} (admin only)
    public function destroy($id)
    {
        $user = Auth::user();
        if (!$this->isAdmin($user)) {
            abort(403, 'Admin only.');
        }
        $review = PlayerGeneralReview::findOrFail($id);
        $playerId = $review->player_id;
        $review->delete();
        $this->updatePlayerOverallRating($playerId);
        return response()->json(['message' => 'Review deleted.']);
    }

    protected function updatePlayerOverallRating($playerId)
    {
        $player = Player::find($playerId);
        if ($player) {
            $avg = PlayerGeneralReview::where('player_id', $playerId)->avg('rating');
            $player->overall_ranking = $avg;
            $player->save();
        }
    }

    protected function authorizeMediaOrAdmin($user)
    {
        if (!$user || (!$user->roles()->where('role_name', 'media')->exists() && !$this->isAdmin($user))) {
            abort(403, 'Media or admin only.');
        }
    }

    protected function isAdmin($user)
    {
        return $user && $user->roles()->where('role_name', 'admin')->exists();
    }
} 