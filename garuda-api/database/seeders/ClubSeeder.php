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
            'category' => 'Professional',
            'members' => 25,
            'founded' => 2015,
            'achievements' => 'Jakarta League Champions 2023,National Tournament Runner-up',
        ]);
        Club::create([
            'name' => 'Goblin United',
            'city' => 'Bandung',
            'description' => 'Klub muda penuh semangat.',
            'logo_url' => null,
            'contact_email' => 'info@goblinunited.com',
            'category' => 'Semi-Pro',
            'members' => 18,
            'founded' => 2018,
            'achievements' => 'West Java Champions 2022',
        ]);

        Club::create([
            'name' => 'Jakarta Thunders',
            'city' => 'Jakarta',
            'description' => 'Elite basketball club competing at the highest level in Indonesian basketball.',
            'logo_url' => 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop',
            'contact_email' => 'info@jakartathunders.com',
            'category' => 'Professional',
            'members' => 25,
            'founded' => 2015,
            'achievements' => 'Jakarta League Champions 2023,National Tournament Runner-up',
        ]);
        Club::create([
            'name' => 'Bandung Eagles',
            'city' => 'Bandung',
            'description' => 'Competitive club focused on developing young talent and regional competitions.',
            'logo_url' => 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=200&h=200&fit=crop',
            'contact_email' => 'info@bandungeagles.com',
            'category' => 'Semi-Pro',
            'members' => 18,
            'founded' => 2018,
            'achievements' => 'West Java Champions 2022',
        ]);
        Club::create([
            'name' => 'Surabaya Sharks',
            'city' => 'Surabaya',
            'description' => 'Community-focused club welcoming players of all skill levels.',
            'logo_url' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
            'contact_email' => 'info@surabayasharks.com',
            'category' => 'Amateur',
            'members' => 32,
            'founded' => 2020,
            'achievements' => 'East Java Amateur League Winners',
        ]);
        Club::create([
            'name' => 'Medan Warriors',
            'city' => 'Medan',
            'description' => 'Dedicated to developing young basketball talent aged 12-18.',
            'logo_url' => 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop',
            'contact_email' => 'info@medanwarriors.com',
            'category' => 'Youth',
            'members' => 40,
            'founded' => 2017,
            'achievements' => 'North Sumatra Youth Champions',
        ]);
        Club::create([
            'name' => 'Yogyakarta Dragons',
            'city' => 'Yogyakarta',
            'description' => 'Competitive club with strong emphasis on teamwork and skill development.',
            'logo_url' => 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=200&h=200&fit=crop',
            'contact_email' => 'info@yogyakartadragons.com',
            'category' => 'Semi-Pro',
            'members' => 22,
            'founded' => 2016,
            'achievements' => 'Central Java Semi-Pro League Champions',
        ]);
        Club::create([
            'name' => 'Bali Waves',
            'city' => 'Denpasar',
            'description' => 'Recreational club promoting basketball as a fun and healthy lifestyle.',
            'logo_url' => 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200&h=200&fit=crop',
            'contact_email' => 'info@baliwaves.com',
            'category' => 'Recreational',
            'members' => 35,
            'founded' => 2019,
            'achievements' => 'Community Spirit Award 2023',
        ]);
    }
} 