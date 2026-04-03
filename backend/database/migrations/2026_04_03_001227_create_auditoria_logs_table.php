<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('auditoria_logs', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('usuario_id')->constrained('usuarios')->onDelete('cascade');
            
            $table->string('accion')->comment('Ej: CREAR, EDITAR, ELIMINAR, LOGIN');
            $table->string('tabla_afectada')->comment('Ej: empresas, documentos, declaraciones');
            $table->unsignedBigInteger('registro_id')->nullable()->comment('El ID del registro modificado');
            $table->text('descripcion');
            $table->string('direccion_ip')->nullable();
            
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('auditoria_logs');
    }
};