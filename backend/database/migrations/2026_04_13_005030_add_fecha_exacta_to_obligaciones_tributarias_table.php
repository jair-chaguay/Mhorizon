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
        Schema::table('obligaciones_tributarias', function (Blueprint $table) {
            $table->date('fecha_vencimiento_exacta')->nullable()->after('fecha_presentacion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('obligaciones_tributarias', function (Blueprint $table) {
            $table->dropColumn('fecha_vencimiento_exacta');
        });
    }
};
