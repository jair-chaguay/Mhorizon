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
        // Nombre provisional que el equipo le pone a una campaña para organizarse.
        // No reemplaza campaign_name de email_logs: solo se muestra en el CRM.
        Schema::create('campaign_aliases', function (Blueprint $table) {
            $table->id();
            $table->string('campaign_name')->unique();
            $table->string('alias');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaign_aliases');
    }
};
