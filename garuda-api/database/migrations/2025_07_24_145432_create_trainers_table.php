<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trainers', function (Blueprint $table) {
            $table->uuid('trainer_id')->primary();
            $table->foreignUuid('user_id')->constrained('users', 'user_id')->onDelete('cascade');
            $table->string('specialization')->nullable();
            $table->text('bio')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trainers');
    }
};
