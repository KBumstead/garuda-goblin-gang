<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TrainingProgram;
use App\Models\Trainer;

class TrainingProgramController extends Controller
{
    // GET /training-programs?skill_level=&trainer_id=&age_range=&cost_min=&cost_max=&page=&per_page=
    public function index(Request $request)
    {
        $query = TrainingProgram::query();
        if ($request->has('skill_level')) {
            $query->where('skill_level', $request->input('skill_level'));
        }
        if ($request->has('trainer_id')) {
            $query->where('trainer_id', $request->input('trainer_id'));
        }
        if ($request->has('age_range')) {
            $query->where('age_range', $request->input('age_range'));
        }
        if ($request->has('cost_min')) {
            $query->where('cost', '>=', $request->input('cost_min'));
        }
        if ($request->has('cost_max')) {
            $query->where('cost', '<=', $request->input('cost_max'));
        }
        $perPage = $request->input('per_page', 10);
        $programs = $query->paginate($perPage);
        return response()->json($programs);
    }

    // GET /training-programs/{id}
    public function show($id)
    {
        $program = TrainingProgram::with('trainer')->findOrFail($id);
        return response()->json($program);
    }

    // POST /training-programs (trainer or admin)
    public function store(Request $request)
    {
        $user = Auth::user();
        $trainer = Trainer::where('user_id', $user->user_id)->first();
        if (!$trainer && !$user->roles()->where('role_name', 'admin')->exists()) {
            abort(403, 'Only trainers or admin can create programs.');
        }
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'skill_level' => 'required|string',
            'age_range' => 'nullable|string',
            'cost' => 'nullable|numeric',
            'participant' => 'nullable|integer',
            'city' => 'nullable|string',
        ]);
        $program = TrainingProgram::create([
            'trainer_id' => $trainer ? $trainer->trainer_id : $request->input('trainer_id'),
            'title' => $request->title,
            'description' => $request->description,
            'skill_level' => $request->skill_level,
            'age_range' => $request->age_range,
            'cost' => $request->cost,
            'participant' => $request->participant,
            'city' => $request->city,
        ]);
        return response()->json($program, 201);
    }

    // PUT /training-programs/{id} (trainer owner or admin)
    public function update($id, Request $request)
    {
        $user = Auth::user();
        $program = TrainingProgram::findOrFail($id);
        $trainer = Trainer::where('user_id', $user->user_id)->first();
        if (($trainer && $program->trainer_id !== $trainer->trainer_id) && !$user->roles()->where('role_name', 'admin')->exists()) {
            abort(403, 'Forbidden');
        }
        $request->validate([
            'title' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'skill_level' => 'sometimes|required|string',
            'age_range' => 'nullable|string',
            'cost' => 'nullable|numeric',
            'participant' => 'nullable|integer',
            'city' => 'nullable|string',
        ]);
        $program->update($request->only(['title', 'description', 'skill_level', 'age_range', 'cost', 'participant', 'city']));
        return response()->json($program);
    }

    // DELETE /training-programs/{id} (admin only)
    public function destroy($id)
    {
        $user = Auth::user();
        if (!$user->roles()->where('role_name', 'admin')->exists()) {
            abort(403, 'Admin only.');
        }
        $program = TrainingProgram::findOrFail($id);
        $program->delete();
        return response()->json(['message' => 'Training program deleted.']);
    }
} 