<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Trainer;
use App\Models\User;
use App\Models\Role;

class TrainerController extends Controller
{
    // GET /trainers?specialization=&page=&per_page=
    public function index(Request $request)
    {
        $query = Trainer::query();
        if ($request->has('specialization')) {
            $query->where('specialization', 'like', '%' . $request->input('specialization') . '%');
        }
        $perPage = $request->input('per_page', 10);
        $trainers = $query->paginate($perPage);
        return response()->json($trainers);
    }

    // POST /trainers (user registers as trainer)
    public function store(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'specialization' => 'required|string',
            'bio' => 'nullable|string',
        ]);
        // Add trainer role
        $trainerRole = Role::where('role_name', 'trainer')->first();
        if ($user && $trainerRole) {
            $user->roles()->syncWithoutDetaching([$trainerRole->role_id]);
        }
        // Create trainer row if not exists
        $trainer = Trainer::firstOrCreate(
            ['user_id' => $user->user_id],
            [
                'specialization' => $request->specialization,
                'bio' => $request->bio,
            ]
        );
        return response()->json($trainer, 201);
    }

    // PUT /trainers/{id} (self or admin)
    public function update($id, Request $request)
    {
        $user = Auth::user();
        $trainer = Trainer::findOrFail($id);
        if ($user->user_id !== $trainer->user_id && !$user->roles()->where('role_name', 'admin')->exists()) {
            abort(403, 'Forbidden');
        }
        $request->validate([
            'specialization' => 'sometimes|required|string',
            'bio' => 'nullable|string',
        ]);
        $trainer->update($request->only(['specialization', 'bio']));
        return response()->json($trainer);
    }

    // DELETE /trainers/{id} (admin only)
    public function destroy($id)
    {
        $user = Auth::user();
        if (!$user->roles()->where('role_name', 'admin')->exists()) {
            abort(403, 'Admin only.');
        }
        $trainer = Trainer::findOrFail($id);
        $trainer->delete();
        return response()->json(['message' => 'Trainer deleted.']);
    }
} 