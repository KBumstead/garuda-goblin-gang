<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tournament_schools', function (Blueprint $table) {
            $table->foreignUuid('tournament_id')->constrained('tournaments', 'tournament_id')->onDelete('cascade');
            $table->foreignUuid('school_id')->constrained('schools', 'school_id')->onDelete('cascade');
            $table->primary(['tournament_id', 'school_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tournament_schools');
    }
};
