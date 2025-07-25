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
        $clubs = Club::all();
        $schools = School::all();
        $players = Player::all();
        $matches = [];
        echo 'Schools count: ' . $schools->count() . PHP_EOL;
        echo 'Clubs count: ' . $clubs->count() . PHP_EOL;
        echo 'Players count: ' . $players->count() . PHP_EOL;
        if ($schools->count() < 2) {
            echo 'Not enough schools to seed matches. Skipping match seeding.' . PHP_EOL;
            return;
        }
        if ($clubs->count() < 2) {
            echo 'Not enough clubs to seed matches. Skipping match seeding.' . PHP_EOL;
            return;
        }
        if ($players->count() < 1) {
            echo 'No players found to seed player match stats. Skipping player stats.' . PHP_EOL;
            return;
        }
        if ($tournament && $clubs->count() >= 2) {
            $venues = ['Stadion Utama', 'Arena Bandung', 'Surabaya Hall', 'Medan Arena', 'Yogyakarta Dome'];
            $date = now()->addDays(1);
            $venueIdx = 0;
            $matches = [];

            // Iterate through clubs two at a time
            for ($i = 0; $i < min($clubs->count(), 8); $i += 2) {
                if (!isset($clubs[$i + 1])) {
                    break; // make sure there is a pair
                }

                $homeClub = $clubs[$i];
                $awayClub = $clubs[$i + 1];

                $match = MatchModel::create([
                    'tournament_id' => $tournament->tournament_id,
                    'home_club_id' => $homeClub->club_id,
                    'away_club_id' => $awayClub->club_id,
                    'home_school_id' => null,
                    'away_school_id' => null,
                    'match_datetime' => $date->addDays(1),
                    'venue' => $venues[$venueIdx % count($venues)],
                    'home_team_score' => rand(60, 100),
                    'away_team_score' => rand(60, 100),
                ]);

                $matches[] = $match;
                $venueIdx++;
            }
        }
        // Add player stats for each match
        foreach ($matches as $match) {
            foreach ($players as $player) {
                PlayerMatchStats::create([
                    'player_id' => $player->player_id,
                    'match_id' => $match->match_id,
                    'minutes_played' => rand(20, 40),
                    'points' => rand(5, 30),
                    'assists' => rand(0, 10),
                    'rebounds' => rand(0, 12),
                    'steals' => rand(0, 5),
                    'blocks' => rand(0, 3),
                    'field_goals_made' => rand(2, 12),
                    'field_goals_attempted' => rand(5, 20),
                ]);
            }
        }
    }
}