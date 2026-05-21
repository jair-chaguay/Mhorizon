<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('clientes', function (Blueprint $table) {
            $table->foreignId('gestionado_por_id')->nullable()->constrained('usuarios')->onDelete('set null');
        });
    }

    public function down(): void {
        Schema::table('clientes', function (Blueprint $table) {
            $table->dropForeign(['gestionado_por_id']);
            $table->dropColumn('gestionado_por_id');
        });
    }
};
