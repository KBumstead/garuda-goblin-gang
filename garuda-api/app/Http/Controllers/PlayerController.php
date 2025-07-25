<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;
use App\Models\User;
use App\Models\Role;
use App\Models\PlayerGeneralReview;
use App\Models\PlayerMatchStats;
use Illuminate\Support\Facades\Auth;

class PlayerController extends Controller
{
    // GET /players/{id}
    public function show($id)
    {
        $player = Player::with(['user', 'clubs', 'school', 'generalReviews'])->findOrFail($id);
        $averageRating = $player->generalReviews()->avg('rating');
        $player->average_rating = $averageRating;
        return response()->json($player);
    }

    // GET /players/{id}/reviews?page=1
    public function reviews($id, Request $request)
    {
        $player = Player::findOrFail($id);
        $reviews = $player->generalReviews()->orderByDesc('created_at')->paginate(10);
        return response()->json($reviews);
    }

    // POST /players (admin only)
    public function store(Request $request)
    {
        $this->authorizeAdmin();
        $request->validate([
            'user_id' => 'required|exists:users,user_id',
            'school_id' => 'required|exists:schools,school_id',
            'height_cm' => 'required|integer',
            'weight_kg' => 'required|integer',
            'position' => 'required|string',
            'date_of_birth' => 'required|date',
            'overall_ranking' => 'nullable|integer',
        ]);
        $player = Player::create($request->all());
        // Add 'player' role to user
        $user = User::find($request->user_id);
        $playerRole = Role::where('role_name', 'player')->first();
        if ($user && $playerRole) {
            $user->roles()->syncWithoutDetaching([$playerRole->role_id]);
        }
        return response()->json($player, 201);
    }

    // PUT /players/{id}/stats (admin only)
    public function updateStats($id, Request $request)
    {
        $this->authorizeAdmin();
        $player = Player::findOrFail($id);
        $request->validate([
            'match_id' => 'required|exists:matches,match_id',
            'minutes_played' => 'required|integer',
            'points' => 'required|integer',
            'assists' => 'required|integer',
            'rebounds' => 'required|integer',
            'steals' => 'required|integer',
            'blocks' => 'required|integer',
            'field_goals_made' => 'required|integer',
            'field_goals_attempted' => 'required|integer',
        ]);
        $stats = PlayerMatchStats::updateOrCreate(
            [
                'player_id' => $player->player_id,
                'match_id' => $request->match_id,
            ],
            $request->only([
                'minutes_played',
                'points',
                'assists',
                'rebounds',
                'steals',
                'blocks',
                'field_goals_made',
                'field_goals_attempted'
            ])
        );
        return response()->json($stats);
    }

    // DELETE /players/{id} (admin only)
    public function destroy($id)
    {
        $this->authorizeAdmin();
        $player = Player::findOrFail($id);
        $user = $player->user;
        $playerRole = Role::where('role_name', 'player')->first();
        if ($user && $playerRole) {
            $user->roles()->detach($playerRole->role_id);
        }
        $player->delete();
        return response()->json(['message' => 'Player deleted and role removed.']);
    }

    // GET /players/ranking?age_min=...&age_max=...&position=...&gender=...
    public function ranking(Request $request)
    {
        $query = \App\Models\Player::query();
        if ($request->has('age_min') || $request->has('age_max')) {
            $today = now();
            if ($request->has('age_min')) {
                $maxBirth = $today->copy()->subYears($request->input('age_min'));
                $query->where('date_of_birth', '<=', $maxBirth->toDateString());
            }
            if ($request->has('age_max')) {
                $minBirth = $today->copy()->subYears($request->input('age_max') + 1)->addDay();
                $query->where('date_of_birth', '>=', $minBirth->toDateString());
            }
        }
        if ($request->has('position')) {
            $query->where('position', $request->input('position'));
        }
        // Filter by gender (via user relation, assuming gender is on users table)
        if ($request->filled('gender')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('gender', $request->input('gender'));
            });
        }
        $perPage = $request->input('per_page', 10);
        $players = $query->with('user')->orderByDesc('overall_ranking')->paginate($perPage);
        // Hide relations
        // $players->getCollection()->makeHidden(['school', 'clubs', 'generalReviews', 'matchReviews', 'matchStats', 'programApplications']);
        return response()->json($players);
    }

    // GET /players?match_id=...&club_id=...&age_min=...&age_max=...&gender=...&name=...
    public function index(Request $request)
    {
        $query = Player::query();

        // Filter by match_id (players who have stats for this match)
        if ($request->filled('match_id')) {
            $query->whereHas('matchStats', function ($q) use ($request) {
                $q->where('match_id', $request->input('match_id'));
            });
        }

        // Filter by club_id (players who belong to this club)
        if ($request->filled('club_id')) {
            $query->whereHas('clubs', function ($q) use ($request) {
                $q->where('clubs.club_id', $request->input('club_id'));
            });
        }

        // Filter by age range
        $today = now();
        if ($request->filled('age_min')) {
            $maxBirth = $today->copy()->subYears($request->input('age_min'));
            $query->where('date_of_birth', '<=', $maxBirth->toDateString());
        }
        if ($request->filled('age_max')) {
            $minBirth = $today->copy()->subYears($request->input('age_max') + 1)->addDay();
            $query->where('date_of_birth', '>=', $minBirth->toDateString());
        }

        // Filter by gender (via user relation, assuming gender is on users table)
        if ($request->filled('gender')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('gender', $request->input('gender'));
            });
        }

        // Filter by name (partial match, via user relation)
        if ($request->filled('name')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('full_name', 'like', '%' . $request->input('name') . '%');
            });
        }

        $perPage = $request->input('per_page', 10);
        $players = $query->with(['clubs', 'school', 'user'])->paginate($perPage);
        return response()->json($players);
    }

    protected function authorizeAdmin()
    {
        $user = Auth::user();
        if (!$user || !$user->roles()->where('role_name', 'admin')->exists()) {
            abort(403, 'Admin only.');
        }
    }
}
