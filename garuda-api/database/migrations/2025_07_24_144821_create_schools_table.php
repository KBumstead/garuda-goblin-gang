<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->uuid('school_id')->primary();
            $table->string('name');
            $table->string('city');
            $table->integer('ranking')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};
