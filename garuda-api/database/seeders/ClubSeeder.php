<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Club;

class ClubSeeder extends Seeder
{
    public function run(): void
    {
        Club::create([
            'name' => 'Garuda FC',
            'city' => 'Jakarta',
            'description' => 'Klub sepak bola legendaris.',
            'logo_url' => null,
            'contact_email' => 'info@garudafc.com',
        ]);
        Club::create([
            'name' => 'Goblin United',
            'city' => 'Bandung',
            'description' => 'Klub muda penuh semangat.',
            'logo_url' => null,
            'contact_email' => 'info@goblinunited.com',
        ]);
    }
} 