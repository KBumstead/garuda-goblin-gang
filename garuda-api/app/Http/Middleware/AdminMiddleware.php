<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        if (!$user || !$user->roles()->where('role_name', 'admin')->exists()) {
            abort(403, 'Admin only.');
        }
        return $next($request);
    }
} 