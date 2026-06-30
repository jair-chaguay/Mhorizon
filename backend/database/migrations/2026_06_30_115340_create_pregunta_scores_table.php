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
            $table->timestamps();
        });
        DB::table('pregunta_scores')->insert([
            [ "enunciado" => "Milton", "peso_maximo" => "20"],
            [ "enunciado" => "Marcos", "peso_maximo" => "30"],
            [ "enunciado" => "Richard", "peso_maximo" => "40"],
            [ "enunciado" => "Milton", "peso_maximo" => "10"],
            [ "enunciado" => "Marcos", "peso_maximo" => "20"],
            [ "enunciado" => "Richard", "peso_maximo" => "15"],
            [ "enunciado" => "Milton", "peso_maximo" => "30"],
            [ "enunciado" => "Marcos", "peso_maximo" => "42"],
            [ "enunciado" => "Richard", "peso_maximo" => "25"],
            [ "enunciado" => "Milton", "peso_maximo" => "15"],
            [ "enunciado" => "Marcos", "peso_maximo" => "10"],
            [ "enunciado" => "Richard", "peso_maximo" => "5"],
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
