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
        // Etiquetas elegidas en Difusión manual (separadas por coma); el worker de Python ya la lee
        if (!Schema::hasColumn('tareas_envio', 'etiqueta_filtro')) {
            Schema::table('tareas_envio', function (Blueprint $table) {
                $table->string('etiqueta_filtro')->nullable()->after('fase_objetivo');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tareas_envio', function (Blueprint $table) {
            $table->dropColumn('etiqueta_filtro');
        });
    }
};
