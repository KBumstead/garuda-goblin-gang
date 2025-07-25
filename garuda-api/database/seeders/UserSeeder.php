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
        $scoutRole = Role::where('role_name', 'scout')->first();
        $trainerRole = Role::where('role_name', 'trainer')->first();
        $adminRole = Role::where('role_name', 'admin')->first();

        // 1. Only Viewer
        $viewerUser = User::factory()->create([
            'full_name' => 'Budi Penonton',
            'email' => 'viewer@example.com',
            'password' => Hash::make('password'),
        ]);
        $viewerUser->roles()->attach($userRole->role_id);

        // 3. Viewer and Scout
        $mediaUser = User::factory()->create([
            'full_name' => 'Citra Media',
            'email' => 'media@example.com',
            'password' => Hash::make('password'),
        ]);
        $mediaUser->roles()->attach([$userRole->role_id, $scoutRole->role_id]);

        // 4. Viewer and Trainer
        $trainerUser = User::factory()->create([
            'full_name' => 'Dewi Pelatih',
            'email' => 'trainer@example.com',
            'password' => Hash::make('password'),
        ]);
        $trainerUser->roles()->attach([$userRole->role_id, $trainerRole->role_id]);

        // 6. Viewer, Media, and Trainer
        $mediaTrainerUser = User::factory()->create([
            'full_name' => 'Fitri Analis',
            'email' => 'media.trainer@example.com',
            'password' => Hash::make('password'),
        ]);
        $mediaTrainerUser->roles()->attach([$userRole->role_id, $scoutRole->role_id, $trainerRole->role_id]);
        
        // 7. Admin
        $adminUser = User::factory()->create([
            'full_name' => 'Admin Utama',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $adminUser->roles()->attach($adminRole->role_id);
    }
}
