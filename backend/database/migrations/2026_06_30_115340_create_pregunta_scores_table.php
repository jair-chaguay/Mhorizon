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
        Schema::create('pregunta_scores', function (Blueprint $table) {
            $table->id();
            $table->string('enunciado');
            $table->integer('peso_maximo');
            $table->boolean('activa')->default(true);
            $table->text('comentario_score')->nullable();
            $table->timestamps();
        });
        DB::table('pregunta_scores')->insert([
            [ "enunciado" => "Pregunta 1", "peso_maximo" => "20"],
            [ "enunciado" => "Pregunta 2", "peso_maximo" => "30"],
            [ "enunciado" => "Pregunta 3", "peso_maximo" => "20"],
            [ "enunciado" => "Pregunta 4", "peso_maximo" => "10"],
            [ "enunciado" => "Pregunta 5", "peso_maximo" => "20"]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pregunta_scores');
    }
};
