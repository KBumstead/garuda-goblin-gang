<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\PlayerMatchStats;

class PlayerMatchStatsController extends Controller
{
    // GET /player-match-stats?match_id=&player_id=
    public function show(Request $request)
    {
        $request->validate([
            'match_id' => 'sometimes|exists:matches,match_id',
            'player_id' => 'sometimes|exists:players,player_id',
        ]);
        $query = PlayerMatchStats::query();
        if ($request->has('match_id')) {
            $query->where('match_id', $request->match_id);
        }
        if ($request->has('player_id')) {
            $query->where('player_id', $request->player_id);
        }
        $stats = $query->get();
        return response()->json($stats);
    }

    // POST /player-match-stats (admin only)
    public function store(Request $request)
    {
        $this->authorizeAdmin();
        $request->validate([
            'match_id' => 'required|exists:matches,match_id',
            'player_id' => 'required|exists:players,player_id',
            'minutes_played' => 'required|integer',
            'points' => 'required|integer',
            'assists' => 'required|integer',
            'rebounds' => 'required|integer',
            'steals' => 'required|integer',
            'blocks' => 'required|integer',
            'field_goals_made' => 'required|integer',
            'field_goals_attempted' => 'required|integer',
        ]);
        $stats = PlayerMatchStats::create($request->all());
        return response()->json($stats, 201);
    }

    // PUT /player-match-stats (admin only)
    public function update(Request $request)
    {
        $this->authorizeAdmin();
        $request->validate([
            'match_id' => 'required|exists:matches,match_id',
            'player_id' => 'required|exists:players,player_id',
            'minutes_played' => 'sometimes|required|integer',
            'points' => 'sometimes|required|integer',
            'assists' => 'sometimes|required|integer',
            'rebounds' => 'sometimes|required|integer',
            'steals' => 'sometimes|required|integer',
            'blocks' => 'sometimes|required|integer',
            'field_goals_made' => 'sometimes|required|integer',
            'field_goals_attempted' => 'sometimes|required|integer',
        ]);
        $stats = PlayerMatchStats::where('match_id', $request->match_id)
            ->where('player_id', $request->player_id)
            ->firstOrFail();
        $stats->update($request->only([
            'minutes_played', 'points', 'assists', 'rebounds', 'steals', 'blocks', 'field_goals_made', 'field_goals_attempted'
        ]));
        return response()->json($stats);
    }

    protected function authorizeAdmin()
    {
        $user = Auth::user();
        if (!$user || !$user->roles()->where('role_name', 'admin')->exists()) {
            abort(403, 'Admin only.');
        }
    }
} 