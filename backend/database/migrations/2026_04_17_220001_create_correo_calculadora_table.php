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
        Schema::create('correo_calculadora', function (Blueprint $table) {
            $table->id();
            $table->string('correo', 100);
            $table->enum('tipo_contribuyente',['Natural', 'Jurídica']);
            $table->boolean('regimen')->default(false);

            $table->decimal('base_imponible', 12, 2)->default(0);
            $table->decimal('impuesto_causado', 12, 2)->default(0);
            $table->decimal('rebaja', 12, 2)->default(0);
            $table->decimal('creditos', 12, 2)->default(0);
            $table->decimal('total_pagar', 12, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('correo_calculadora');
    }
};
