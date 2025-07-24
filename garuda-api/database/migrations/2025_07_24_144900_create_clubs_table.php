<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clubs', function (Blueprint $table) {
            $table->uuid('club_id')->primary();
            $table->string('name');
            $table->string('city', 100);
            $table->text('description')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('contact_email')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clubs');
    }
};
