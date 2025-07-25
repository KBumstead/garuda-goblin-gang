<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('clubs', function (Blueprint $table) {
            $table->string('category')->nullable()->after('contact_email');
            $table->integer('members')->nullable()->after('category');
            $table->integer('founded')->nullable()->after('members');
            $table->text('achievements')->nullable()->after('founded');
        });
    }

    public function down(): void
    {
        Schema::table('clubs', function (Blueprint $table) {
            $table->dropColumn(['category', 'members', 'founded', 'achievements']);
        });
    }
};
