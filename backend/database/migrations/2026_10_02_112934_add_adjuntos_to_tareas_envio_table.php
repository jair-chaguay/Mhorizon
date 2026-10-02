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
        Schema::table('tareas_envio', function (Blueprint $table) {
            $table->text('adjuntos')->nullable()->after('cuerpo');
            //
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tareas_envio', function (Blueprint $table) {
            $table->dropColumn('adjuntos');
        });
    }
};
