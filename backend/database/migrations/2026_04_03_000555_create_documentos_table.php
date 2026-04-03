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
        Schema::create('documentos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subcarpeta_id')->constrained('biblioteca_subcarpetas')->onDelete('cascade');
            $table->foreignId('subido_por_id')->constrained('usuarios')->onDelete('restrict');
            $table->foreignId('modificado_por_id')->nullable()->constrained('usuarios')->onDelete('set null');
            
            $table->string('nombre_archivo');
            $table->enum('tipo', ['pdf', 'excel', 'word', 'otro'])->default('pdf');
            $table->string('url_archivo');
            $table->text('observacion_cliente')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documentos');
    }
};
