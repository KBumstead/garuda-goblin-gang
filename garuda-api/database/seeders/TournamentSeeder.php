<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tournament;
use App\Models\Club;
use App\Models\School;

class TournamentSeeder extends Seeder
{
    public function run(): void
    {
        $tournament1 = Tournament::create([
            'name' => 'Garuda Cup 2024',
            'start_date' => '2024-08-01',
            'end_date' => '2024-08-10',
            'description' => 'Turnamen basket tahunan.',
            'age_category' => 'U-18',
            'location' => 'Jakarta',
        ]);
        $tournament2 = Tournament::create([
            'name' => 'Goblin Challenge',
            'start_date' => '2024-09-15',
            'end_date' => '2024-09-20',
            'description' => 'Kompetisi basket antar sekolah.',
            'age_category' => 'U-16',
            'location' => 'Bandung',
        ]);
        $club1 = Club::where('name', 'Garuda FC')->first();
        $club2 = Club::where('name', 'Goblin United')->first();
        $school1 = School::where('name', 'SMA Negeri 1 Jakarta')->first();
        $school2 = School::where('name', 'SMA Negeri 2 Bandung')->first();
        if ($tournament1 && $club1 && $club2 && $school1 && $school2) {
            $tournament1->clubs()->attach([$club1->club_id, $club2->club_id]);
            $tournament1->schools()->attach([$school1->school_id, $school2->school_id]);
        }
        if ($tournament2 && $club2 && $school2) {
            $tournament2->clubs()->attach([$club2->club_id]);
            $tournament2->schools()->attach([$school2->school_id]);
        }
    }
} 