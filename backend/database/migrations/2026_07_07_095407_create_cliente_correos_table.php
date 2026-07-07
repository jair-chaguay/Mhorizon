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

        Schema::create('cliente_correos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained('clientes')->onDelete('cascade');
            $table->string('correo')->unique(); 
            $table->timestamps();
        });

        Schema::table('clientes', function (Blueprint $table) {
            $table->string('tipo_servicio')->nullable()->after('identificacion');
            
            $table->enum('tipo_contribuyente', ['Persona Natural', 'Sociedad'])->nullable()->after('tipo_servicio');
            
            $table->string('regimen_tributario')->nullable()->comment('General, RIMPE, Grande Contribuyente, Contribuyente Especial, Exportador habitual')->after('tipo_contribuyente');
            
            $table->boolean('agente_retencion')->default(false)->after('regimen_tributario');
            
            $table->text('actividad_economica')->nullable()->after('agente_retencion');
            
            $table->string('sector')->nullable()->comment('Servicios, Comercial, Industrial, Turismo, Financiero, Otros')->after('actividad_economica');
            
            $table->string('telefono_contacto', 20)->nullable()->after('sector');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cliente_correos');
        Schema::table('clientes', function (Blueprint $table) {
            $table->dropColumn([
                'tipo_servicio',
                'tipo_contribuyente',
                'regimen_tributario',
                'agente_retencion',
                'actividad_economica',
                'sector',
                'telefono_contacto'
            ]);
        });
    }
};
