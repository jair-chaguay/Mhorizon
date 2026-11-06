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
        // Formato elegido en Difusión manual: 'personal' (correo redactado) o 'campana' (correo con diseño).
        // Las tareas de la IA lo dejan vacío
        if (!Schema::hasColumn('tareas_envio', 'formato')) {
            Schema::table('tareas_envio', function (Blueprint $table) {
                $table->string('formato', 20)->nullable()->after('tipo');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tareas_envio', function (Blueprint $table) {
            $table->dropColumn('formato');
        });
    }
};
