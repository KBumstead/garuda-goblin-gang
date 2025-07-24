<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->uuid('match_id')->primary();
            $table->foreignUuid('tournament_id')->constrained('tournaments', 'tournament_id')->onDelete('cascade');
            $table->foreignUuid('home_club_id')->nullable()->constrained('clubs', 'club_id');
            $table->foreignUuid('away_club_id')->nullable()->constrained('clubs', 'club_id');
            $table->foreignUuid('home_school_id')->nullable()->constrained('schools', 'school_id');
            $table->foreignUuid('away_school_id')->nullable()->constrained('schools', 'school_id');
            $table->dateTime('match_datetime');
            $table->string('venue')->nullable();
            $table->integer('home_team_score')->nullable();
            $table->integer('away_team_score')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
