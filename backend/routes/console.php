<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('obligaciones:renovar')->daily();

Schedule::command('notificaciones:tributarias')->dailyAt('10:00');
Schedule::command('notificaciones:urgente-final')->cron('0 10,15,18 * * *');