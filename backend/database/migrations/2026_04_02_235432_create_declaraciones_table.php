<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('declaraciones', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('empresa_id')->constrained('empresas')->onDelete('cascade');
            
            $table->foreignId('creado_por_id')->constrained('usuarios')->onDelete('restrict');
            $table->foreignId('modificado_por_id')->nullable()->constrained('usuarios')->onDelete('set null');
            
            $table->string('periodo_fiscal')->comment('Ej: Enero 2026, Año 2025');
            $table->string('tipo_impuesto')->comment('Ej: IVA (Formulario 104), Retención en la Fuente');
            $table->enum('estado', ['Presentada y Pagada', 'Borrador', 'Pendiente de Pago'])->default('Borrador');
            $table->date('fecha_presentacion')->nullable();
            
            $table->string('comprobante_url')->nullable();
            
            $table->text('observacion_interna')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('declaraciones');
    }
};