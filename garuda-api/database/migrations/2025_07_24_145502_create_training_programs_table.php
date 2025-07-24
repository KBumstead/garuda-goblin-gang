<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('training_programs', function (Blueprint $table) {
            $table->uuid('program_id')->primary();
            $table->foreignUuid('trainer_id')->constrained('trainers', 'trainer_id')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('skill_level', ['Beginner', 'Intermediate', 'Advanced'])->nullable();
            $table->string('age_range', 50)->nullable();
            $table->decimal('cost', 10, 2)->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('training_programs');
    }
};
