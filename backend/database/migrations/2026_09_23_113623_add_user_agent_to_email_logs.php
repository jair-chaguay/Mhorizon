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
        Schema::table('email_logs', function (Blueprint $table) {
            if(!Schema::hasColumn('email_logs', 'user_agent')){
                $table->text('user_agent')->nullable()->after('url');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('email_logs', function (Blueprint $table) {
            if(Schema::hasColumn('email_logs', 'user_agent')){
                $table->dropColumn('user_agent');
            }
        });
    }
};
