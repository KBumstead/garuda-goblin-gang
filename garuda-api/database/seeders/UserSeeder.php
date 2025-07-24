<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get roles to associate
        $userRole = Role::where('role_name', 'user')->first();
        $playerRole = Role::where('role_name', 'player')->first();
        $mediaRole = Role::where('role_name', 'media')->first();
        $trainerRole = Role::where('role_name', 'trainer')->first();
        $adminRole = Role::where('role_name', 'admin')->first();

        // 1. Only Viewer
        $viewerUser = User::factory()->create([
            'full_name' => 'Budi Penonton',
            'email' => 'viewer@example.com',
            'password' => Hash::make('password'),
        ]);
        $viewerUser->roles()->attach($userRole->role_id);

        // 2. Viewer and Player
        $playerUser = User::factory()->create([
            'full_name' => 'Agung Pemain',
            'email' => 'player@example.com',
            'password' => Hash::make('password'),
        ]);
        $playerUser->roles()->attach([$userRole->role_id, $playerRole->role_id]);

        // 3. Viewer and Media
        $mediaUser = User::factory()->create([
            'full_name' => 'Citra Media',
            'email' => 'media@example.com',
            'password' => Hash::make('password'),
        ]);
        $mediaUser->roles()->attach([$userRole->role_id, $mediaRole->role_id]);

        // 4. Viewer and Trainer
        $trainerUser = User::factory()->create([
            'full_name' => 'Dewi Pelatih',
            'email' => 'trainer@example.com',
            'password' => Hash::make('password'),
        ]);
        $trainerUser->roles()->attach([$userRole->role_id, $trainerRole->role_id]);

        // 5. Viewer, Player, and Trainer
        $playerTrainerUser = User::factory()->create([
            'full_name' => 'Eko Serbaguna',
            'email' => 'player.trainer@example.com',
            'password' => Hash::make('password'),
        ]);
        $playerTrainerUser->roles()->attach([$userRole->role_id, $playerRole->role_id, $trainerRole->role_id]);

        // 6. Viewer, Media, and Trainer
        $mediaTrainerUser = User::factory()->create([
            'full_name' => 'Fitri Analis',
            'email' => 'media.trainer@example.com',
            'password' => Hash::make('password'),
        ]);
        $mediaTrainerUser->roles()->attach([$userRole->role_id, $mediaRole->role_id, $trainerRole->role_id]);
        
        // 7. Admin
        $adminUser = User::factory()->create([
            'full_name' => 'Admin Utama',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $adminUser->roles()->attach($adminRole->role_id);
    }
}
