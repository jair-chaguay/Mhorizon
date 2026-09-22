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
            $table->integer('sent')->default(1)->after('status');
            $table->integer('delivered')->default(1)->after('sent');
            $table->integer('blocked')->default(0)->after('delivered');
            $table->integer('failed')->default(0)->after('blocked');
            $table->integer('spam')->default(0)->after('failed');
            $table->integer('unsubscribed')->default(0)->after('spam');
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
            $table->dropColumn([
                'sent',
                'delivered',
                'blocked',
                'failed',
                'spam',
                'unsubscribed'
            ]);
        });
    }
};
