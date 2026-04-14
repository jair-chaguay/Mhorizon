<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ObligacionTributaria;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Mail\AlertaObligacionMail;
use App\Models\Usuario;

class NotificarJefeUrgente extends Command
{
    protected $signature = 'notificaciones:jefe-urgente';
    protected $description = 'Envía alertas al jefe el último día de vencimiento (10am, 3pm, 8pm)';

    public function handle()
    {
        $hoy = Carbon::today()->format('Y-m-d');

        $obligacionesUrgentes = ObligacionTributaria::with('cliente')
            ->whereDate('fecha_vencimiento_exacta', $hoy)
            ->where('estado', 'Pendiente')
            ->get();

        if ($obligacionesUrgentes->isEmpty()) {
            $this->info('No hay obligaciones venciendo el día de hoy.');
            return;
        }

        $jefeCorreo = env('JEFE_CORREO');
        if (!$jefeCorreo) {
            $this->error('No hay correo de jefe configurado en el .env');
            return;
        }

        $adminGenerico = new Usuario(['nombre' => 'Jefe', 'apellido' => 'Supervisor']);

        foreach ($obligacionesUrgentes as $obligacion) {
            Mail::to($jefeCorreo)
                ->send(new AlertaObligacionMail($obligacion, $adminGenerico));
        }

        $this->info('Alertas de ULTIMO DIA enviadas al Jefe.');
    }
}