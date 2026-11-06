<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Correos desde los que se puede enviar una Difusión manual. Si una cuenta no tiene datos SMTP,
        // el worker envía con su cuenta principal y solo cambia el remitente (sirve para alias del mismo buzón).
        // La contraseña SMTP se guarda cifrada con Crypt (APP_KEY) y nunca se devuelve al frontend
        if (!Schema::hasTable('remitentes')) {
            Schema::create('remitentes', function (Blueprint $table) {
                $table->id();
                $table->string('email')->unique();
                $table->string('nombre', 120);
                $table->string('smtp_host')->nullable();
                $table->unsignedSmallInteger('smtp_port')->nullable();
                $table->string('smtp_usuario')->nullable();
                $table->text('smtp_password')->nullable();
                $table->boolean('predeterminado')->default(false);
                $table->timestamps();
            });

            // La cuenta con la que ya envía el worker
            DB::table('remitentes')->insert([
                'email' => 'consultores@mhorizon.com.ec',
                'nombre' => 'MHORIZON ECUADOR',
                'predeterminado' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('remitentes');
    }
};
