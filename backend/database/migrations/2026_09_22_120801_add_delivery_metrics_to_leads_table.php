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
        Schema::table('leads', function (Blueprint $table) {
            if (!Schema::hasColumn('leads', 'sent')) {
                $table->integer('sent')->default(1)->after('status');
            }
            if (!Schema::hasColumn('leads', 'delivered')) {
                $table->integer('delivered')->default(1)->after('sent');
            }
            if (!Schema::hasColumn('leads', 'blocked')) {
                $table->integer('blocked')->default(0)->after('delivered');
            }
            if (!Schema::hasColumn('leads', 'failed')) {
                $table->integer('failed')->default(0)->after('blocked');
            }
            if (!Schema::hasColumn('leads', 'spam')) {
                $table->integer('spam')->default(0)->after('failed');
            }
            if (!Schema::hasColumn('leads', 'unsubscribed')) {
                $table->integer('unsubscribed')->default(0)->after('spam');
            }
            //
        });

        Schema::create('link_clicks', function(Blueprint $table){
            $table->id();
            $table->string('email');
            $table->text('url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::dropIfExists('link_clicks');
        Schema::table('leads', function (Blueprint $table) {
            $columnsToDrop = [];
            
            if (Schema::hasColumn('leads', 'sent')) $columnsToDrop[] = 'sent';
            if (Schema::hasColumn('leads', 'delivered')) $columnsToDrop[] = 'delivered';
            if (Schema::hasColumn('leads', 'blocked')) $columnsToDrop[] = 'blocked';
            if (Schema::hasColumn('leads', 'failed')) $columnsToDrop[] = 'failed';
            if (Schema::hasColumn('leads', 'spam')) $columnsToDrop[] = 'spam';
            if (Schema::hasColumn('leads', 'unsubscribed')) $columnsToDrop[] = 'unsubscribed';

            if (!empty($columnsToDrop)) {
                $table->dropColumn($columnsToDrop);
            }
        });
    }
};
