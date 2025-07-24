<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Trainer;
use App\Models\User;

class TrainerSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'trainer@example.com')->first();
        if ($user) {
            Trainer::create([
                'user_id' => $user->user_id,
                'specialization' => 'Physical Training',
                'bio' => 'Experienced trainer in physical fitness.',
            ]);
        }
        $user2 = User::where('email', 'player.trainer@example.com')->first();
        if ($user2) {
            Trainer::create([
                'user_id' => $user2->user_id,
                'specialization' => 'Tactical Training',
                'bio' => 'Expert in basketball tactics.',
            ]);
        }
        $user3 = User::where('email', 'media.trainer@example.com')->first();
        if ($user3) {
            Trainer::create([
                'user_id' => $user3->user_id,
                'specialization' => 'Media & Training',
                'bio' => 'Trainer with media experience.',
            ]);
        }
    }
} 