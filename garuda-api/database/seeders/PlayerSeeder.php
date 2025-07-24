<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Player;
use App\Models\User;
use App\Models\School;
use App\Models\Club;
use App\Models\PlayerGeneralReview;

class PlayerSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'player@example.com')->first();
        $school = School::first();
        $club = Club::where('name', 'Garuda FC')->first();
        $reviewer = User::where('email', 'viewer@example.com')->first();
        if ($user && $school && $club) {
            $player = Player::create([
                'user_id' => $user->user_id,
                'school_id' => $school->school_id,
                'height_cm' => 175,
                'weight_kg' => 68,
                'position' => 'Forward',
                'date_of_birth' => '2005-01-01',
                'overall_ranking' => 10,
            ]);
            $player->clubs()->attach($club->club_id, ['join_date' => '2023-01-01']);
            if ($reviewer) {
                PlayerGeneralReview::create([
                    'user_id' => $reviewer->user_id,
                    'player_id' => $player->player_id,
                    'rating' => 5,
                    'comment' => 'Pemain sangat berbakat!',
                ]);
            }
        }
        $user2 = User::where('email', 'player.trainer@example.com')->first();
        $club2 = Club::where('name', 'Goblin United')->first();
        if ($user2 && $school && $club2) {
            $player2 = Player::create([
                'user_id' => $user2->user_id,
                'school_id' => $school->school_id,
                'height_cm' => 180,
                'weight_kg' => 72,
                'position' => 'Guard',
                'date_of_birth' => '2004-05-10',
                'overall_ranking' => 8,
            ]);
            $player2->clubs()->attach($club2->club_id, ['join_date' => '2023-02-01']);
            if ($reviewer) {
                PlayerGeneralReview::create([
                    'user_id' => $reviewer->user_id,
                    'player_id' => $player2->player_id,
                    'rating' => 4,
                    'comment' => 'Pemain bertalenta dan pekerja keras.',
                ]);
            }
        }
    }
} 