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
                'participant' => 30,
                'city' => 'Jakarta',
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
        // Add a second program with a long description
        if ($trainer) {
            TrainingProgram::create([
                'trainer_id' => $trainer->trainer_id,
                'title' => 'National Youth Basketball Development Program',
                'description' => 'This comprehensive program is designed for young athletes who aspire to elevate their basketball skills to the next level. Over the course of eight weeks, participants will engage in intensive training sessions covering advanced ball handling, shooting mechanics, defensive strategies, and team play. The curriculum includes daily drills, weekly scrimmages, and personalized feedback from experienced coaches. In addition to on-court skills, the program features workshops on nutrition, injury prevention, mental toughness, and leadership development. Participants will have the opportunity to interact with guest speakers, including former professional players and sports psychologists. The program culminates in a showcase tournament where players can demonstrate their progress in front of scouts and local club representatives. Whether you are aiming for a school team, club, or national selection, this program provides the tools, knowledge, and motivation to help you succeed in your basketball journey.',
                'skill_level' => 'Advanced',
                'age_range' => '14-18',
                'cost' => 1200000,
                'participant' => 40,
                'city' => 'Bandung',
            ]);
            TrainingProgram::create([
                'trainer_id' => $trainer->trainer_id,
                'title' => 'Beginner Basketball Bootcamp',
                'description' => 'Perfect for those just starting their basketball journey, this four-week bootcamp focuses on the fundamentals of the game. Participants will learn basic dribbling, passing, shooting, and defensive techniques in a supportive and encouraging environment. The program includes daily group drills, fun skill-building games, and friendly competitions to foster teamwork and sportsmanship. Coaches will provide individual attention to help each player build confidence and develop a love for the sport. Parents are invited to attend the final day showcase, where players will demonstrate their new skills. The bootcamp also covers the importance of warm-ups, stretching, and injury prevention for young athletes. All equipment is provided, and scholarships are available for underprivileged youth. Join us to make new friends, stay active, and discover the joy of basketball!',
                'skill_level' => 'Beginner',
                'age_range' => '10-13',
                'cost' => 300000,
                'participant' => 25,
                'city' => 'Surabaya',
            ]);
            TrainingProgram::create([
                'trainer_id' => $trainer->trainer_id,
                'title' => 'Elite Guard Masterclass',
                'description' => 'This exclusive masterclass is tailored for experienced guards who want to refine their skills and elevate their game to elite status. Over two intensive weeks, participants will work closely with former professional players and top-level coaches to master advanced ball handling, court vision, and decision-making under pressure. The curriculum includes video analysis of professional games, one-on-one mentorship, and specialized drills to improve speed, agility, and shooting accuracy. Off the court, players will attend seminars on leadership, mental resilience, and nutrition for peak performance. The program also features a Q&A session with national team athletes and a final scrimmage evaluated by scouts. This is a unique opportunity for ambitious players to gain insights, build connections, and prepare for the next level of competition.',
                'skill_level' => 'Advanced',
                'age_range' => '16-20',
                'cost' => 2500000,
                'participant' => 15,
                'city' => 'Jakarta',
            ]);
        }
    }
} 