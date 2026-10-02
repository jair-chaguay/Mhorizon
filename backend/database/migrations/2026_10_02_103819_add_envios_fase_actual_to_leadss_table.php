<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('leadss', function (Blueprint $table) {
            $table->integer('envios_fase_actual')->default(0)->after('fase');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leadss', function (Blueprint $table) {
            $table->dropColumn('envios_fase_actual');
        });
    }
};
