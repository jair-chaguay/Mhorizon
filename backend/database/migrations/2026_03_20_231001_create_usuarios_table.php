<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('rol_id')->constrained('roles')->onDelete('restrict');
            $table->foreignId('cliente_id')->nullable();
            $table->string('nombre');
            $table->string('apellido');
            $table->string('correo')->unique();
            $table->string('password_hash'); 
            $table->string('cargo')->nullable()->comment('Ej: Tax Manager, Contador');
            $table->boolean('activo')->default(true);
            $table->softDeletes();
            $table->timestamp('ultimo_acceso')->nullable();
        });

        DB::table('usuarios')->insert([
            ['rol_id' => 3, "nombre" => "Milton", "apellido" => "Montece", "correo" => "mmontece@mhorizon.com.ec", "password_hash" => bcrypt("mhorizon2026"), "cargo" => "Creacion", "activo" =>true, 'created_at' => now(), 'updated_at' => now()],
            ['rol_id' => 3, "nombre" => "Marcos", "apellido" => "Nuñez", "correo" => "mnunez@mhorizon.com.ec", "password_hash" => bcrypt("mhorizon2026"), "cargo" => "Creacion", "activo" =>true, 'created_at' => now(), 'updated_at' => now()],
            ['rol_id' => 3, "nombre" => "Richard", "apellido" => "Castro", "correo" => "rcastro@mhorizon.com.ec", "password_hash" => bcrypt("mhorizon2026"), "cargo" => "Creacion", "activo" =>true, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};