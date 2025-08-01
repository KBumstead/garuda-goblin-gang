<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id('role_id');
            $table->enum('role_name', ['user', 'scout', 'trainer', 'admin'])->unique();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
