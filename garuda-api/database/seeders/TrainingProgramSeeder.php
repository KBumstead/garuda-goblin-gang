<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TrainingProgram;
use App\Models\Trainer;
use App\Models\Player;
use App\Models\ProgramApplication;

class TrainingProgramSeeder extends Seeder
{
    public function run(): void
    {
        $trainer = Trainer::first();
        if ($trainer) {
            $program = TrainingProgram::create([
                'trainer_id' => $trainer->trainer_id,
                'title' => 'Intensive Basketball Camp',
                'description' => 'Program pelatihan basket intensif untuk remaja.',
                'skill_level' => 'Intermediate',
                'age_range' => '15-18',
                'cost' => 500000,
            ]);
            $player1 = Player::whereHas('user', function($q) { $q->where('email', 'player@example.com'); })->first();
            $player2 = Player::whereHas('user', function($q) { $q->where('email', 'player.trainer@example.com'); })->first();
            if ($player1) {
                ProgramApplication::create([
                    'program_id' => $program->program_id,
                    'player_id' => $player1->player_id,
                    'status' => 'accepted',
                ]);
            }
            if ($player2) {
                ProgramApplication::create([
                    'program_id' => $program->program_id,
                    'player_id' => $player2->player_id,
                    'status' => 'pending',
                ]);
            }
        }
    }
} 