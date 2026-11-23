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

// Encola una vez al día (10:00, hora de Ecuador) la revisión de fases de la IA: worker_campanas.py envía los correos automáticos.
// Cada fase solo envía los días que le tocan según su calendario
Schedule::command('campanas:auto')->dailyAt('10:00')->withoutOverlapping();