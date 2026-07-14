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
        Schema::create('representantes', function (Blueprint $table){
            $table -> id();
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');
            $table->string('nombre');
            $table->string('correo')->nullable();
            $table->string('cargo')->nullable();
            $table->string('telefono')->nullable();
            $table->timestamps();
        });

        $clientes = DB::table('clientes')->get();

        foreach($clientes as $cliente){
            if(!empty($cliente->representante_nombre)){
                DB::table('representantes')->insert([
                    'cliente_id'=> $cliente->id,
                    'nombre' => $cliente->representante_nombre,
                    'correo' => $cliente->representante_correo,
                    'cargo'      => $cliente->representante_cargo,
                    'telefono'   => null, 
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            if(!empty($cliente->tipo_servicio)){
                $esJson = json_decode($cliente->tipo_servicio);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    $jsonServicio = json_encode([$cliente->tipo_servicio]);
                    DB::table('clientes')
                        ->where('id', $cliente->id)
                        ->update(['tipo_servicio' => $jsonServicio]);
                }
            }
        }

        Schema::table('clientes', function (Blueprint $table){
            $table->dropColumn(['representante_nombre', 'representante_correo', 'representante_cargo']);

            $table->json('tipo_servicio')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('representantes');
        Schema::table('clientes', function (Blueprint $table){
            $table->string('representante_nombre')->nullable();
            $table->string('representante_correo')->nullable();
            $table->string('representante_cargo')->nullable();
            $table->string('tipo_servicio')->nullable()->change();
        });
    }
};
