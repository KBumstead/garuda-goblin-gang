<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            SchoolSeeder::class,
            ClubSeeder::class,
            PlayerSeeder::class,
            TrainerSeeder::class,
            TournamentSeeder::class,
            MatchSeeder::class,
            TrainingProgramSeeder::class,
        ]);
        // TODO: Add demo data for schools, clubs, players, trainers, tournaments, matches, training programs
    }
}
