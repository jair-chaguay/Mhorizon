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
        Schema::create('empresas', function (Blueprint $table) {
            $table->id();
            $table->string('razon_social');
            $table->string('ruc')->unique();
            $table->text('direccion_matriz')->nullable();
            $table->integer('score_tributario')->default(100); 
            $table->date('proximo_vencimiento')->nullable();

            $table->foreignId('creado_por_id')
                  ->nullable()
                  ->constrained('usuarios')
                  ->onDelete('set null'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};