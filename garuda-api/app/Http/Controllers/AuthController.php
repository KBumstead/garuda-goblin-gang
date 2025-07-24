<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Role;

class AuthController extends Controller
{
    // POST /register
    public function register(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);
        $user = User::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        // Optionally assign default role
        $role = Role::where('role_name', 'user')->first();
        if ($role) {
            $user->roles()->attach($role->role_id);
        }
        return response()->json(['message' => 'Registration successful'], 201);
    }

    // POST /login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $token = $user->createToken('api')->plainTextToken;
        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    // GET /profile (self or admin)
    public function profile(Request $request)
    {
        $user = Auth::user();
        $targetId = $request->query('user_id');
        if ($targetId && ($user->user_id === $targetId || $user->roles()->where('role_name', 'admin')->exists())) {
            $target = User::findOrFail($targetId);
            return response()->json($target);
        }
        return response()->json($user);
    }

    // PUT /profile (self or admin, cannot update email)
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        $targetId = $request->input('user_id');
        if ($targetId && ($user->user_id === $targetId || $user->roles()->where('role_name', 'admin')->exists())) {
            $target = User::findOrFail($targetId);
        } else {
            $target = $user;
        }
        $request->validate([
            'full_name' => 'sometimes|required|string|max:255',
            'password' => 'sometimes|required|string|min:6|confirmed',
        ]);
        if ($request->has('full_name')) {
            $target->full_name = $request->full_name;
        }
        if ($request->has('password')) {
            $target->password = Hash::make($request->password);
        }
        $target->save();
        return response()->json(['message' => 'Profile updated', 'user' => $target]);
    }
} 