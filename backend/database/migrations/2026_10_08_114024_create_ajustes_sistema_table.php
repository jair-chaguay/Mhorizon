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
        Schema::create('ajustes_sistema', function (Blueprint $table) {
            $table->id();
            $table->string('clave')->unique();
            $table->boolean('valor')->default(false);
            $table->timestamps();
        });
        DB::table('ajustes_sistema')->insert([
            'clave'=>'agente_imap_activo',
            'valor'=>true,
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ajustes_sistema');
    }
};
