<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'profile_picture_url' => null,
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac libero nulla. Suspendisse aliquet ullamcorper sem. Praesent dictum nunc in enim aliquam mattis. Nulla lacinia non justo ut posuere. Cras lacus neque, viverra eu arcu in, sollicitudin vestibulum purus. Vivamus sodales ipsum et turpis tristique suscipit.',
            'age' => 19,
            'gender' => 'Male',
            'region' => 'Jakarta',
            'remember_token' => Str::random(10),
        ]);
        $viewerUser->roles()->attach($userRole->role_id);

        // 3. Viewer and Scout
        $mediaUser = User::factory()->create([
            'full_name' => 'Citra Media',
            'email' => 'media@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'profile_picture_url' => null,
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac libero nulla. Suspendisse aliquet ullamcorper sem. Praesent dictum nunc in enim aliquam mattis. Nulla lacinia non justo ut posuere. Cras lacus neque, viverra eu arcu in, sollicitudin vestibulum purus. Vivamus sodales ipsum et turpis tristique suscipit.',
            'age' => 21,
            'gender' => 'Female',
            'region' => 'West Java',
            'remember_token' => Str::random(10),
        ]);
        $mediaUser->roles()->attach([$userRole->role_id, $scoutRole->role_id]);

        // 4. Viewer and Trainer
        $trainerUser = User::factory()->create([
            'full_name' => 'Dewi Pelatih',
            'email' => 'trainer@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'profile_picture_url' => null,
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac libero nulla. Suspendisse aliquet ullamcorper sem. Praesent dictum nunc in enim aliquam mattis. Nulla lacinia non justo ut posuere. Cras lacus neque, viverra eu arcu in, sollicitudin vestibulum purus. Vivamus sodales ipsum et turpis tristique suscipit.',
            'age' => 28,
            'gender' => 'Female',
            'region' => 'Central Java',
            'remember_token' => Str::random(10),
        ]);
        $trainerUser->roles()->attach([$userRole->role_id, $trainerRole->role_id]);

        // 6. Viewer, Media, and Trainer
        $mediaTrainerUser = User::factory()->create([
            'full_name' => 'Fitri Analis',
            'email' => 'media.trainer@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'profile_picture_url' => null,
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac libero nulla. Suspendisse aliquet ullamcorper sem. Praesent dictum nunc in enim aliquam mattis. Nulla lacinia non justo ut posuere. Cras lacus neque, viverra eu arcu in, sollicitudin vestibulum purus. Vivamus sodales ipsum et turpis tristique suscipit.',
            'age' => 24,
            'gender' => 'Female',
            'region' => 'East Java',
            'remember_token' => Str::random(10),
        ]);
        $mediaTrainerUser->roles()->attach([$userRole->role_id, $scoutRole->role_id, $trainerRole->role_id]);
        
        // 7. Admin
        $adminUser = User::factory()->create([
            'full_name' => 'Admin Utama',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'profile_picture_url' => null,
            'bio' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac libero nulla. Suspendisse aliquet ullamcorper sem. Praesent dictum nunc in enim aliquam mattis. Nulla lacinia non justo ut posuere. Cras lacus neque, viverra eu arcu in, sollicitudin vestibulum purus. Vivamus sodales ipsum et turpis tristique suscipit.',
            'age' => 30,
            'gender' => 'Male',
            'region' => 'Jakarta',
            'remember_token' => Str::random(10),
        ]);
        $adminUser->roles()->attach($adminRole->role_id);
    }
}
