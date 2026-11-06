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
            // Bloques y estilos del correo con diseño (JSON), para poder reutilizar el diseño en otro envío
            if (!Schema::hasColumn('tareas_envio', 'diseno')) {
                $table->longText('diseno')->nullable()->after('cuerpo');
            }
            // Desde qué cuenta sale y con qué nombre lo ve el destinatario ("MHORIZON ECUADOR <consultores@...>")
            if (!Schema::hasColumn('tareas_envio', 'remitente_id')) {
                $table->unsignedBigInteger('remitente_id')->nullable()->after('formato');
            }
            if (!Schema::hasColumn('tareas_envio', 'remitente_email')) {
                $table->string('remitente_email')->nullable()->after('remitente_id');
            }
            if (!Schema::hasColumn('tareas_envio', 'remitente_nombre')) {
                $table->string('remitente_nombre', 120)->nullable()->after('remitente_email');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tareas_envio', function (Blueprint $table) {
            $table->dropColumn(['diseno', 'remitente_id', 'remitente_email', 'remitente_nombre']);
        });
    }
};
