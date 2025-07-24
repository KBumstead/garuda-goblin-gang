<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('player_clubs', function (Blueprint $table) {
            $table->foreignUuid('player_id')->constrained('players', 'player_id')->onDelete('cascade');
            $table->foreignUuid('club_id')->constrained('clubs', 'club_id')->onDelete('cascade');
            $table->date('join_date')->nullable();
            $table->primary(['player_id', 'club_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('player_clubs');
    }
};
