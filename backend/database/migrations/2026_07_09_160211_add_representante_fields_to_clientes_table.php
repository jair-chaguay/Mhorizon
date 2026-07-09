<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('clientes', function (Blueprint $table) {
            $table->string('representante_nombre')->nullable()->after('razon_social_nombres');
            $table->string('representante_correo')->nullable()->after('representante_nombre');
            $table->string('representante_cargo')->nullable()->after('representante_correo');
        });
    }

    public function down(): void
    {
        Schema::table('clientes', function (Blueprint $table) {
            $table->dropColumn(['representante_nombre', 'representante_correo', 'representante_cargo']);
        });
    }
};