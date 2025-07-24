<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Club;
use App\Models\Player;

class ClubController extends Controller
{
    // GET /clubs?city=&name=&page=&per_page=
    public function index(Request $request)
    {
        $query = Club::query();
        if ($request->has('city')) {
            $query->where('city', 'like', '%' . $request->input('city') . '%');
        }
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }
        $perPage = $request->input('per_page', 10);
        $clubs = $query->paginate($perPage);
        return response()->json($clubs);
    }

    // GET /clubs/{id}
    public function show($id)
    {
        $club = Club::with(['players', 'homeMatches' => function($q) {
            $q->where('match_datetime', '>', now())->orderBy('match_datetime');
        }, 'awayMatches' => function($q) {
            $q->where('match_datetime', '>', now())->orderBy('match_datetime');
        }])->findOrFail($id);
        // Merge home and away matches, sort by date
        $matches = $club->homeMatches->merge($club->awayMatches)->sortBy('match_datetime')->values();
        $club->setRelation('upcoming_matches', $matches);
        unset($club->homeMatches, $club->awayMatches);
        return response()->json($club);
    }

    // POST /clubs (admin only)
    public function store(Request $request)
    {
        $this->authorizeAdmin();
        $request->validate([
            'name' => 'required|string',
            'city' => 'required|string',
            'description' => 'nullable|string',
            'logo_url' => 'nullable|string',
            'contact_email' => 'nullable|email',
        ]);
        $club = Club::create($request->all());
        return response()->json($club, 201);
    }

    // PUT /clubs/{id} (admin only)
    public function update($id, Request $request)
    {
        $this->authorizeAdmin();
        $club = Club::findOrFail($id);
        $request->validate([
            'name' => 'sometimes|required|string',
            'city' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'logo_url' => 'nullable|string',
            'contact_email' => 'nullable|email',
        ]);
        $club->update($request->only(['name', 'city', 'description', 'logo_url', 'contact_email']));
        return response()->json($club);
    }

    // POST /clubs/{id}/assign-player (admin only)
    public function assignPlayer($id, Request $request)
    {
        $this->authorizeAdmin();
        $club = Club::findOrFail($id);
        $request->validate([
            'player_id' => 'required|exists:players,player_id',
            'join_date' => 'nullable|date',
        ]);
        $player = Player::findOrFail($request->player_id);
        $club->players()->syncWithoutDetaching([
            $player->player_id => ['join_date' => $request->join_date ?? now()->toDateString()]
        ]);
        return response()->json(['message' => 'Player assigned to club.']);
    }

    protected function authorizeAdmin()
    {
        $user = Auth::user();
        if (!$user || !$user->roles()->where('role_name', 'admin')->exists()) {
            abort(403, 'Admin only.');
        }
    }
} 