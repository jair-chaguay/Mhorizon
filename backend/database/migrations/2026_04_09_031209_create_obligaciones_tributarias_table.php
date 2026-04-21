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
        Schema::create('obligaciones_tributarias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');
            $table->foreignId('usuario_id')->constrained('usuarios')->onDelete('cascade');
            $table->enum('tipo_impuesto', [
                'IVA (Mensual)',
                'IVA (Semestral)',
                'ICE',
                'ISD (MENSUAL)',
                'ISD (ANUAL)',
                'IRBP',
                'IR (Régimen Emprendedor)',
                'IR (Régimen Sociedad)', 
                'IR (Régimen NP)',
                'RETENCIONES FUENTE',
                'ANTICIPO UTILIDADES ACUMULADAS',
                'ACTIVOS EN EL EXTERIOR',
                'IRBP-ANEXO',
                'ROTEF',
                'OPRE',
                'ICT',
                'ADI',
                'DECLARACIÓN PATRIMONIAL/AAP',
                'APS-REBEFICS',
                'RDEP',
                'ATS',
                'PRECIOS VENTA ICE'
            ]);
            $table->string('fecha_presentacion');
            $table->enum('estado', ['Pendiente', 'Presentado'])->default('Pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('obligaciones_tributarias');
    }
};