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
        // Correos de prueba de Difusión manual (tipo 'prueba'): a quién se envía, separados por coma.
        // Esas tareas no son campañas: el worker no las registra ni toca a los prospectos
        if (!Schema::hasColumn('tareas_envio', 'destinatarios_prueba')) {
            Schema::table('tareas_envio', function (Blueprint $table) {
                $table->string('destinatarios_prueba', 500)->nullable()->after('etiqueta_filtro');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tareas_envio', function (Blueprint $table) {
            $table->dropColumn('destinatarios_prueba');
        });
    }
};
