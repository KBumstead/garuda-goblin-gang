<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tournaments', function (Blueprint $table) {
            $table->uuid('tournament_id')->primary();
            $table->string('name');
            $table->date('start_date');
            $table->date('end_date');
            $table->text('description')->nullable();
            $table->string('age_category', 50)->nullable();
            $table->string('location')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tournaments');
    }
};
