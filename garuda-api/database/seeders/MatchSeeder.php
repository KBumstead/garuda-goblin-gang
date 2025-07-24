<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MatchModel;
use App\Models\Tournament;
use App\Models\Club;
use App\Models\School;
use App\Models\Player;
use App\Models\User;
use App\Models\PlayerMatchStats;
use App\Models\PlayerMatchReview;

class MatchSeeder extends Seeder
{
    public function run(): void
    {
        $tournament = Tournament::first();
        $club1 = Club::where('name', 'Garuda FC')->first();
        $club2 = Club::where('name', 'Goblin United')->first();
        $school1 = School::where('name', 'SMA Negeri 1 Jakarta')->first();
        $school2 = School::where('name', 'SMA Negeri 2 Bandung')->first();
        if ($tournament && $club1 && $club2 && $school1 && $school2) {
            $match = MatchModel::create([
                'tournament_id' => $tournament->tournament_id,
                'home_club_id' => $club1->club_id,
                'away_club_id' => $club2->club_id,
                'home_school_id' => $school1->school_id,
                'away_school_id' => $school2->school_id,
                'match_datetime' => '2024-08-02 15:00:00',
                'venue' => 'Stadion Utama',
                'home_team_score' => 80,
                'away_team_score' => 75,
            ]);
            $player1 = Player::whereHas('user', function($q) { $q->where('email', 'player@example.com'); })->first();
            $player2 = Player::whereHas('user', function($q) { $q->where('email', 'player.trainer@example.com'); })->first();
            $reviewer = User::where('email', 'viewer@example.com')->first();
            if ($player1 && $match) {
                PlayerMatchStats::create([
                    'player_id' => $player1->player_id,
                    'match_id' => $match->match_id,
                    'minutes_played' => 30,
                    'points' => 20,
                    'assists' => 5,
                    'rebounds' => 7,
                    'steals' => 2,
                    'blocks' => 1,
                    'field_goals_made' => 8,
                    'field_goals_attempted' => 15,
                ]);
                if ($reviewer) {
                    PlayerMatchReview::create([
                        'user_id' => $reviewer->user_id,
                        'player_id' => $player1->player_id,
                        'match_id' => $match->match_id,
                        'comment' => 'Permainan sangat bagus!'
                    ]);
                }
            }
            if ($player2 && $match) {
                PlayerMatchStats::create([
                    'player_id' => $player2->player_id,
                    'match_id' => $match->match_id,
                    'minutes_played' => 28,
                    'points' => 15,
                    'assists' => 7,
                    'rebounds' => 5,
                    'steals' => 1,
                    'blocks' => 0,
                    'field_goals_made' => 6,
                    'field_goals_attempted' => 12,
                ]);
                if ($reviewer) {
                    PlayerMatchReview::create([
                        'user_id' => $reviewer->user_id,
                        'player_id' => $player2->player_id,
                        'match_id' => $match->match_id,
                        'comment' => 'Perlu meningkatkan defense.'
                    ]);
                }
            }
        }
    }
} 