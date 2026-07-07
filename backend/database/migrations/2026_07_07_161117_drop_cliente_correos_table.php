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
        // Eliminamos la tabla de la base de datos
        Schema::dropIfExists('cliente_correos');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Recreamos la tabla tal como estaba originalmente por si se hace rollback
        Schema::create('cliente_correos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');
            $table->string('correo')->unique(); 
            $table->timestamps();
        });
    }
};