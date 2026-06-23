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
                'DECLARACIÓN DEL IVA',
                'DECLARACIÓN DE RETENCIONES EN LA FUENTE DEL IR',
                'DECLARACIÓN DE AUTORETENCIONES EN LA FUENTE DEL IR',
                'DECLARACIÓN DEL IMPUESTO REDIMIBLE A LAS BOTELLAS PLÁSTICAS',
                'ANEXO TRANSACCIONAL SIMPLIFICADO - ATS (MENSUAL)',
                'ANEXO IMPUESTO CONSUMOS ESPECIALES (ICE)',     
                'ANEXO IMPUESTO REDIMIBLE A LAS BOTELLAS PLÁSTICAS',
                'PAGO DE APORTE AL IESS',
                'FONDOS DE RESERVA',
                'IMPUESTO A LOS CONSUMOS ESPECIALES - ICE (MENSUAL)',
                'IMPUESTO A LA SALIDA DE DIVISAS - ISD (MENSUAL)',
                'IMPUESTO A LOS ACTIVOS EN EL EXTERIOR',
                'REPORTE OPERACIONES INUSUALES INJUSTIFICADAS (ROI)',
                'REPORTE OPERACIONES IGUALES O SUPERIORES AL UMBRAL LEGAL',
                'REPORTE VENTAS A CRÉDITO',
                
                //SEMESTRALES
                'DECLARACIÓN DEL IVA (RÉGIMEN RIMPE)',  
                'DECLARACIÓN DE IMPUESTO A LA RENTA (RÉGIMEN RIMPE)',
                'DECLARACIÓN DE RETENCIONES EN LA FUENTE DEL IR (RÉGIMEN RIMPE)',
                'ANEXO TRANSACCIONAL SIMPLIFICADO - ATS (RÉGIMEN RIMPE)',

                //ANUALES
                'ANEXO DE PRECIOS DE VENTA AL PÚBLICO (ICE - PVP)',
                'ANEXO DE GASTOS PERSONALES',
                'REPORTE BENEFICIARIOS FINALES Y COMPOSICIÓN SOCIETARIA (REBEFICS)',
                'ANEXO DE RELACION DE DEPENDENCIA (RDEP)',
                'ANEXO DE OPERACIONES Y TRANSACCIONES ECONÓMICAS FINANCIERAS (ROTEF)',
                'DECLARACIÓN DE IMPUESTO A LA RENTA (PERSONAS NATURALES)',
                'DÉCIMO CUARTO SUELDO (COSTA)',
                'DÉCIMO CUARTO SUELDO (SIERRA)',
                'DECLARACIÓN DE IMPUESTO A LA RENTA (SOCIEDADES)',    
                'IMPUESTO A LA SALIDA DE DIVISAS - ISD TARJETAS DE CRÉDITO',
                'IMPUESTO A LA SALIDA DE DIVISAS EXPORTACIONES - ISD PRESUNTIVO',
                'PRESENTACIÓN DE ESTADOS FINANCIEROS',
                'PARTICIPACIÓN DE UTILIDADES (15%)',
                'DECLARACIÓN DE IMPUESTO A LA RENTA (PERSONAS NATURALES RÉGIMEN RIMPE ANUAL)',
                'ANEXO DE DIVIDENDOS (ADI)',
                'DECLARACIÓN PATRIMONIAL PERSONAS NATURALES',
                'PATENTE MUNICIPAL',
                'IMPUESTO 1.5 POR MIL SOBRE ACTIVOS',
                'TASA DE HABILITACIÓN/LUAE',
                'PERMISO DE FUNCIONAMIENTO',
                'TASA DE BOMBEROS',
                'ANEXO DE OPERACIONES CON PARTES RELACIONADAS',
                'INFORME DE PRECIOS DE TRANSFERENCIA',
                'IMPUESTO PREDIAL URBANO',
                'IMPUESTO PREDIAL RURAL',
                'DECLARACIÓN DEL PAGO A CUENTA SOBRE UTILIDADES NO DISTRIBUIDAS',
                'CONTRIBUCIÓN SOCIETARIA',
                'TASA MUNICIPAL POR PUBLICIDAD EXTERIOR',
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