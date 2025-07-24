<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('program_applications', function (Blueprint $table) {
            $table->uuid('application_id')->primary();
            $table->foreignUuid('program_id')->constrained('training_programs', 'program_id')->onDelete('cascade');
            $table->foreignUuid('player_id')->constrained('players', 'player_id')->onDelete('cascade');
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');
            $table->timestamp('application_date')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program_applications');
    }
};
