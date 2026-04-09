<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('informativos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('creado_por_id')->constrained('usuarios')->onDelete('restrict');
            $table->foreignId('modificado_por_id')->nullable()->constrained('usuarios')->onDelete('set null');
            $table->string('titulo');
            $table->string('resolucion_oficial')->nullable();
            $table->text('contenido');
            $table->string('imagen_portada_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('informativos');
    }
};
