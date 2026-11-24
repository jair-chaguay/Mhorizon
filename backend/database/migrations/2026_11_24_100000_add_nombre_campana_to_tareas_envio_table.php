<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tareas_envio', function (Blueprint $table) {
            // Identificador de la campaña de cada difusión manual (campaign_name de email_logs).
            // Es el asunto, y si ese asunto ya se usó en otro envío, "Asunto (2)", "Asunto (3)"...
            // Así dos envíos con el mismo asunto no se juntan en una sola campaña
            if (!Schema::hasColumn('tareas_envio', 'nombre_campana')) {
                $table->string('nombre_campana')->nullable()->after('asunto');
            }
        });
    }

    public function down(): void
    {
        Schema::table('tareas_envio', function (Blueprint $table) {
            $table->dropColumn('nombre_campana');
        });
    }
};
