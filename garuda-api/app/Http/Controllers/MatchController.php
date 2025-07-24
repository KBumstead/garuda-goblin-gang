<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MatchModel;
use Illuminate\Support\Facades\Auth;

class MatchController extends Controller
{
    // GET /matches/upcoming?page=1
    public function upcoming(Request $request)
    {
        $perPage = $request->input('per_page', 5);
        $now = now();
        $matches = MatchModel::with(['homeClub', 'awayClub', 'homeSchool', 'awaySchool', 'tournament'])
            ->where('match_datetime', '>', $now)
            ->orderBy('match_datetime')
            ->paginate($perPage);
        return response()->json($matches);
    }

    // GET /matches?team_id=&date_from=&date_to=&tournament_id=&page=&per_page=
    public function index(Request $request)
    {
        $query = MatchModel::with(['homeClub', 'awayClub', 'homeSchool', 'awaySchool', 'tournament']);
        if ($request->has('team_id')) {
            $teamId = $request->input('team_id');
            $query->where(function($q) use ($teamId) {
                $q->where('home_club_id', $teamId)
                  ->orWhere('away_club_id', $teamId)
                  ->orWhere('home_school_id', $teamId)
                  ->orWhere('away_school_id', $teamId);
            });
        }
        if ($request->has('date_from')) {
            $query->where('match_datetime', '>=', $request->input('date_from'));
        }
        if ($request->has('date_to')) {
            $query->where('match_datetime', '<=', $request->input('date_to'));
        }
        if ($request->has('tournament_id')) {
            $query->where('tournament_id', $request->input('tournament_id'));
        }
        $perPage = $request->input('per_page', 10);
        $matches = $query->orderBy('match_datetime')->paginate($perPage);
        return response()->json($matches);
    }

    // POST /matches (admin only)
    public function store(Request $request)
    {
        $this->authorizeAdmin();
        $request->validate([
            'tournament_id' => 'required|exists:tournaments,tournament_id',
            'home_club_id' => 'nullable|exists:clubs,club_id',
            'away_club_id' => 'nullable|exists:clubs,club_id',
            'home_school_id' => 'nullable|exists:schools,school_id',
            'away_school_id' => 'nullable|exists:schools,school_id',
            'match_datetime' => 'required|date',
            'venue' => 'nullable|string',
            'home_team_score' => 'nullable|integer',
            'away_team_score' => 'nullable|integer',
        ]);
        $match = MatchModel::create($request->all());
        return response()->json($match, 201);
    }

    // PUT /matches/{id} (admin only)
    public function update($id, Request $request)
    {
        $this->authorizeAdmin();
        $match = MatchModel::findOrFail($id);
        $request->validate([
            'tournament_id' => 'sometimes|exists:tournaments,tournament_id',
            'home_club_id' => 'nullable|exists:clubs,club_id',
            'away_club_id' => 'nullable|exists:clubs,club_id',
            'home_school_id' => 'nullable|exists:schools,school_id',
            'away_school_id' => 'nullable|exists:schools,school_id',
            'match_datetime' => 'sometimes|date',
            'venue' => 'nullable|string',
            'home_team_score' => 'nullable|integer',
            'away_team_score' => 'nullable|integer',
        ]);
        $match->update($request->all());
        return response()->json($match);
    }

    // DELETE /matches/{id} (admin only)
    public function destroy($id)
    {
        $this->authorizeAdmin();
        $match = MatchModel::findOrFail($id);
        $match->delete();
        return response()->json(['message' => 'Match deleted.']);
    }

    // Helper for admin check (uses middleware in routes)
    protected function authorizeAdmin()
    {
        $user = Auth::user();
        if (!$user || !$user->roles()->where('role_name', 'admin')->exists()) {
            abort(403, 'Admin only.');
        }
    }
} 