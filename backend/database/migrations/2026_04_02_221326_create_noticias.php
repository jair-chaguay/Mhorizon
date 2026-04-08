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
        Schema::create('noticias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('creado_por_id')->constrained('usuarios')->onDelete('restrict');
            $table->string('titulo');
            $table->string('fuente');
            $table->enum('categoria', ['Impuesto', 'Finanzas', 'Economía', 'Laboral', 'Societario'])->default('Impuesto');
            $table->string('descripcion_corta');
            $table->string('url_destino');
            $table->string('imagen_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('noticias');
    }
};
