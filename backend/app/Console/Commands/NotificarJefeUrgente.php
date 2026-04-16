<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ObligacionTributaria;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Mail\AlertaObligacionMail;
use App\Models\Usuario;


/**
 * Comando de consola para notificar al jefe sobre obligaciones urgentes.
 * * Este comando busca obligaciones tributarias que vencen en la fecha actual
 * y envía un correo electrónico individual por cada una de ellas al correo
 * configurado como supervisor.
 */

class NotificarJefeUrgente extends Command
{
    /**
     * El nombre y firma del comando de consola.
     *
     * @var string
     */
    protected $signature = 'notificaciones:jefe-urgente';
    /**
     * La descripción del comando de consola.
     *
     * @var string
     */
    protected $description = 'Envía alertas al jefe el último día de vencimiento (10am, 3pm, 8pm)';

    public function handle()
    {

        $hoy = Carbon::today()->format('Y-m-d');
        //Obtiene todas las obligaciones que vencen el día de hoy
        $obligacionesUrgentes = ObligacionTributaria::with('cliente')
            ->whereDate('fecha_vencimiento_exacta', $hoy)
            ->where('estado', 'Pendiente')
            ->get();

        if ($obligacionesUrgentes->isEmpty()) {
            $this->info('No hay obligaciones venciendo el día de hoy.');
            return;
        }

        //Toma el correo del encargado y lo configura
        $jefeCorreo = env('JEFE_CORREO');
        if (!$jefeCorreo) {
            $this->error('No hay correo de jefe configurado en el .env');
            return;
        }

        $adminGenerico = new Usuario(['nombre' => 'Jefe', 'apellido' => 'Supervisor']);

        //Envia por cada obligación encontrada un correo 
        foreach ($obligacionesUrgentes as $obligacion) {
            Mail::to($jefeCorreo)
                ->send(new AlertaObligacionMail($obligacion, $adminGenerico));
        }

        $this->info('Alertas de ULTIMO DIA enviadas al Jefe.');
    }
}