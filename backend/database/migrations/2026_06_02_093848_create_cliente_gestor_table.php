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
        Schema::create('cliente_gestor', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');
            $table->foreignId('usuario_id')->constrained('usuarios')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::table('clientes', function (Blueprint $table) {
            $table->dropForeign(['gestionado_por_id']);
            $table->dropColumn('gestionado_por_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clientes', function (Blueprint $table) {
            $table->foreignId('gestionado_por_id')->nullable()->constrained('usuarios')->onDelete('set null');
        });

        Schema::dropIfExists('cliente_gestor');
    }
};
