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
        // Motivo del rebote que reporta el servidor SMTP (opcional)
        Schema::table('email_logs', function (Blueprint $table) {
            $table->text('bounce_reason')->nullable()->after('user_agent');
        });

        // Las bajas que el agente IMAP ya marcó como "NO CONTACTAR" no tenían evento en email_logs.
        // Se crea uno por prospecto (con su última campaña) para que el CRM las cuente como desuscritos.
        $yaRegistrados = DB::table('email_logs')->where('event_type', 'unsubscribe')->pluck('email')->all();
        $bajas = DB::table('leadss')->where('status', 'NO CONTACTAR')->whereNotIn('email', $yaRegistrados)->get(['email', 'updated_at']);

        foreach ($bajas as $lead) {
            $ultimoEnvio = DB::table('email_logs')
                ->where('email', $lead->email)
                ->where('event_type', 'sent')
                ->orderBy('id', 'desc')
                ->first();

            DB::table('email_logs')->insert([
                'email' => $lead->email,
                'campaign_name' => $ultimoEnvio ? $ultimoEnvio->campaign_name : 'Campaña General',
                'event_type' => 'unsubscribe',
                'created_at' => $lead->updated_at ?? now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('email_logs', function (Blueprint $table) {
            $table->dropColumn('bounce_reason');
        });
    }
};
