<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->boolean('es_interno')->default(true);
            $table->integer('nivel_acceso')->default(1);
            $table->timestamps();
        });

        DB::table('roles')->insert([
            ['nombre' => 'admin', 'es_interno'=>true, 'nivel_acceso'=> 1, 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'cliente', 'es_interno'=>false, 'nivel_acceso'=> 2, 'created_at' => now(), 'updated_at' => now()]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
