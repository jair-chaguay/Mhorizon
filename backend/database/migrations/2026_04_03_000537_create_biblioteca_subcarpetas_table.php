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
        Schema::create('biblioteca_subcarpetas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('periodo_id')->constrained('biblioteca_periodos')->onDelete('cascade');
            $table->foreignId('parent_id')->nullable()->constrained('biblioteca_subcarpetas')->onDelete('cascade');
            $table->string('nombre')->comment('Ej: Estados Financieros, Declaraciones');
            $table->foreignId('creado_por_id')->constrained('usuarios')->onDelete('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('biblioteca_subcarpetas');
    }
};
