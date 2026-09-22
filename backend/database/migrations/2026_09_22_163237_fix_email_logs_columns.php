<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('email_logs', function (Blueprint $table) {
            // Verificamos y agregamos 'campaign_name' si no existe
            if (!Schema::hasColumn('email_logs', 'campaign_name')) {
                $table->string('campaign_name')->nullable()->after('email');
            }
            
            // Verificamos y agregamos 'url' si no existe
            if (!Schema::hasColumn('email_logs', 'url')) {
                $table->text('url')->nullable()->after('event_type');
            }
        });
    }

    public function down(): void
    {
        Schema::table('email_logs', function (Blueprint $table) {
            if (Schema::hasColumn('email_logs', 'campaign_name')) {
                $table->dropColumn('campaign_name');
            }
            if (Schema::hasColumn('email_logs', 'url')) {
                $table->dropColumn('url');
            }
        });
    }
};