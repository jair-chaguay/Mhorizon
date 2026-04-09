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
            $table->enum('tipo_impuesto', [
                'Impuesto a la Renta',
                'IVA (Mensual)',
                'IVA (Semestral)',
                'ICE',
                'ISD',
                'Activos Mantenidos en el Exterior',
                'Anexo Transaccional (ATS)'
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