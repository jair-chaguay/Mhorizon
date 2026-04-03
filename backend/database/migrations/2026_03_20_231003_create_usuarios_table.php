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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('rol_id')->constrained('roles')->onDelete('restrict');
            $table->foreignId('empresa_id')->nullable()->constrained('empresas')->onDelete('cascade');
            
            $table->string('nombre');
            $table->string('apellido');
            $table->string('correo')->unique();
            $table->string('password_hash'); 
            $table->string('cargo')->nullable()->comment('Ej: Tax Manager, Contador');            
            $table->boolean('activo')->default(true);
            $table->timestamp('ultimo_acceso')->nullable();
            

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};

