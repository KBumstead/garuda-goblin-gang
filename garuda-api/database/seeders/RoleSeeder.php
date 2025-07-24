<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['user', 'player', 'media', 'trainer', 'admin'];

        foreach ($roles as $role) {
            Role::create(['role_name' => $role]);
        }
    }
}
