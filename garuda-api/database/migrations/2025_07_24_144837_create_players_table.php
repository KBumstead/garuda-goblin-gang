<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('players', function (Blueprint $table) {
            $table->uuid('player_id')->primary();
            $table->foreignUuid('user_id')->nullable()->constrained('users', 'user_id')->onDelete('set null');
            $table->foreignUuid('school_id')->nullable()->constrained('schools', 'school_id')->onDelete('set null');
            $table->integer('height_cm')->nullable();
            $table->integer('weight_kg')->nullable();
            $table->string('position', 50)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->integer('overall_ranking')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
