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
                //mensuales
                'IVA (MENSUAL)',
                'RETENCIONES FUENTE IR (MENSUAL)',
                'RETENCIONES IVA',
                'IRBP',
                'ATS (MENSUAL)',
                'ANEXO ICE',     
                'ANEXO IRBP',
                'PAGO APORTE IESS',
                'FONDOS DE RESERVA',
                'ANEXO REOC',
                'ICE (MENSUAL)',
                'ISD (MENSUAL)',
                
                //SEMESTRALES
                'IVA (RÉGIMEN RIMPE)',  
                'IR (RÉGIMEN RIMPE SEMESTRAL)',
                'RETENCIONES IR (RÉGIMEN RIMPE)',
                'ATS (RÉGIMEN RIMPE)',
                'ICE (SEMESTRAL)',

                //ANUALES
                'ICE - PVP',
                'ANEXO GASTOS PERSONALES',
                'APS',
                'RDEP',
                'ROTEF',
                'IR (PERSONAS NATURALES)',
                'DÉCIMO CUARTO SUELDO (COSTA)',
                'DÉCIMO CUARTO SUELDO (SIERRA)',
                'IR (SOCIEDADES)',    
                'ISD (ANUAL)',
                'PRESENTACIÓN ESTADOS FINANCIEROS',
                'PARTICIPACIÓN DE UTILIDADES',
                'IR (RIMPE ANUAL)',
                'ADI',
                'DECLARACIÓN PATRIMONIAL',
                'PATENTE MUNICIPAL',
                'IMPUESTO 1.5 POR MIL',
                'LUAE',
                'PERMISO DE FUNCIONAMIENTO',
                'TASA DE BOMBEROS',
                'ANEXO PARTES RELACIONADAS',
                'INFORME PRECIOS DE TRANSFERENCIA',
                'IMPUESTO PREDIAL URBANO',
                'IMPUESTO PREDIAL RURAL',
                'PAGO A CUENTA',
                'ANTICIPO UTILIDADES ACUMULADAS',
                'CONTRIBUCIÓN SOCIETARIA',
                'IMPUESTO PUBLICIDAD EXTERIOR',
                'DÉCIMO TERCER SUELDO'
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