<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tournament_clubs', function (Blueprint $table) {
            $table->foreignUuid('tournament_id')->constrained('tournaments', 'tournament_id')->onDelete('cascade');
            $table->foreignUuid('club_id')->constrained('clubs', 'club_id')->onDelete('cascade');
            $table->primary(['tournament_id', 'club_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tournament_clubs');
    }
};
