<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('player_match_stats', function (Blueprint $table) {
            $table->uuid('player_match_stat_id')->primary();
            $table->foreignUuid('player_id')->constrained('players', 'player_id')->onDelete('cascade');
            $table->foreignUuid('match_id')->constrained('matches', 'match_id')->onDelete('cascade');
            $table->integer('minutes_played')->nullable();
            $table->integer('points')->default(0);
            $table->integer('assists')->default(0);
            $table->integer('rebounds')->default(0);
            $table->integer('steals')->default(0);
            $table->integer('blocks')->default(0);
            $table->integer('field_goals_made')->default(0);
            $table->integer('field_goals_attempted')->default(0);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('player_match_stats');
    }
};
