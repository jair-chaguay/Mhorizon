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
        // Datos de contacto y seguimiento que se editan desde la ficha del prospecto en el CRM
        Schema::table('leadss', function (Blueprint $table) {
            $table->string('nombre')->nullable()->after('email');
            $table->string('empresa')->nullable()->after('nombre');
            $table->string('telefono', 50)->nullable()->after('empresa');
            $table->string('responsable')->nullable()->after('telefono');
            $table->string('proxima_accion')->nullable()->after('responsable');
            $table->date('proxima_fecha')->nullable()->after('proxima_accion');
            $table->text('notas')->nullable()->after('proxima_fecha');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leadss', function (Blueprint $table) {
            $table->dropColumn(['nombre', 'empresa', 'telefono', 'responsable', 'proxima_accion', 'proxima_fecha', 'notas']);
        });
    }
};
