<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\School;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        School::create([
            'name' => 'SMA Negeri 1 Jakarta',
            'city' => 'Jakarta',
            'ranking' => 1,
        ]);
        School::create([
            'name' => 'SMA Negeri 2 Bandung',
            'city' => 'Bandung',
            'ranking' => 2,
        ]);
        School::create([
            'name' => 'SMA Negeri 3 Surabaya',
            'city' => 'Surabaya',
            'ranking' => 3,
        ]);
    }
} 