<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('biblioteca_periodos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');
            $table->string('anio', 4)->comment('Ej: 2025, 2026');
            $table->foreignId('creado_por_id')->constrained('usuarios')->onDelete('restrict');
            $table->timestamps();
            $table->unique(['cliente_id', 'anio']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('biblioteca_periodos');
    }
};