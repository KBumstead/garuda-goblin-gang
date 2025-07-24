<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\School;
use App\Models\Player;

class SchoolController extends Controller
{
    // GET /schools?city=&name=&page=&per_page=
    public function index(Request $request)
    {
        $query = School::query();
        if ($request->has('city')) {
            $query->where('city', 'like', '%' . $request->input('city') . '%');
        }
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }
        $perPage = $request->input('per_page', 10);
        $schools = $query->paginate($perPage);
        return response()->json($schools);
    }

    // GET /schools/{id}
    public function show($id)
    {
        $school = School::with(['players', 'homeMatches' => function($q) {
            $q->where('match_datetime', '>', now())->orderBy('match_datetime');
        }, 'awayMatches' => function($q) {
            $q->where('match_datetime', '>', now())->orderBy('match_datetime');
        }])->findOrFail($id);
        // Merge home and away matches, sort by date
        $matches = $school->homeMatches->merge($school->awayMatches)->sortBy('match_datetime')->values();
        $school->setRelation('upcoming_matches', $matches);
        unset($school->homeMatches, $school->awayMatches);
        return response()->json($school);
    }

    // POST /schools (admin only)
    public function store(Request $request)
    {
        $this->authorizeAdmin();
        $request->validate([
            'name' => 'required|string',
            'city' => 'required|string',
            'ranking' => 'nullable|integer',
        ]);
        $school = School::create($request->all());
        return response()->json($school, 201);
    }

    // PUT /schools/{id} (admin only)
    public function update($id, Request $request)
    {
        $this->authorizeAdmin();
        $school = School::findOrFail($id);
        $request->validate([
            'name' => 'sometimes|required|string',
            'city' => 'sometimes|required|string',
            'ranking' => 'nullable|integer',
        ]);
        $school->update($request->only(['name', 'city', 'ranking']));
        return response()->json($school);
    }

    // POST /schools/{id}/assign-player (admin only)
    public function assignPlayer($id, Request $request)
    {
        $this->authorizeAdmin();
        $school = School::findOrFail($id);
        $request->validate([
            'player_id' => 'required|exists:players,player_id',
        ]);
        $player = Player::findOrFail($request->player_id);
        $player->school_id = $school->school_id;
        $player->save();
        return response()->json(['message' => 'Player assigned to school.']);
    }

    protected function authorizeAdmin()
    {
        $user = Auth::user();
        if (!$user || !$user->roles()->where('role_name', 'admin')->exists()) {
            abort(403, 'Admin only.');
        }
    }
} 