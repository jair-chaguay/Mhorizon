<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // create_clientes_table.php (Antes empresas)
public function up(): void
{
    Schema::create('clientes', function (Blueprint $table) {
        $table->id();
        
        // AQUÍ ESTÁ LA DIFERENCIA CLAVE
        $table->enum('tipo_persona', ['Natural', 'Jurídica'])->default('Jurídica');
        
        $table->string('razon_social_nombres'); 
        
        $table->string('identificacion', 20)->unique(); 
        
        $table->text('direccion_matriz')->nullable();
        $table->integer('score_tributario')->default(100); 
        $table->date('proximo_vencimiento')->nullable();

        $table->foreignId('creado_por_id')->nullable()->constrained('usuarios')->onDelete('set null'); 
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
