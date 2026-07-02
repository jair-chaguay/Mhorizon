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
            [ "enunciado" => "¿Cómo califica la calidad general del servicio de consultoría tributaria recibido?", "peso_maximo" => "20"],
            [ "enunciado" => "¿Cómo califica el nivel de conocimiento técnico demostrado por nuestro equipo?", "peso_maximo" => "25"],
            [ "enunciado" => "¿Cómo califica la oportunidad y rapidez en la atención de sus consultas, requerimientos y reformas legales?", "peso_maximo" => "20"],
            [ "enunciado" => "¿Cómo califica la confianza y seguridad que le genera contar con MHORIZON como asesor tributario?", "peso_maximo" => "25"],
            [ "enunciado" => "¿Qué tan probable es que recomiende los servicios de MHORIZON a otra empresa o persona?", "peso_maximo" => "10"]
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
