<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ObligacionTributaria;
use App\Models\Usuario;
use Illuminate\Support\Facades\Mail;
use App\Mail\AlertaObligacionMail;
use Carbon\Carbon;

/**
 * Comando de consola para enviar recordatorios preventivos de obligaciones tributarias.
 * * Este comando busca obligaciones que vencerán en los próximos 1 a 5 días
 * y envía una alerta diaria a todos los usuarios administradores activos.
 * Trabaja en conjunto con 'notificaciones:jefe-urgente' (que maneja el día de vencimiento).
 */

class NotificarObligacionesTributarias extends Command
{
    protected $signature = 'notificaciones:tributarias';
    protected $description = 'Envía recordatorios diarios para obligaciones a 5 días o menos de vencer';

    public function handle()
    {
        //Variable de las fechas
        $hoy = Carbon::today()->format('Y-m-d');
        $fechaUmbral = Carbon::now()->addDays(5)->format('Y-m-d');

        //Busca las obligaciones que se encuentren en el intervalo de la fechaUmbral
        //con el estado pendiente y excluye la de hoy, puesto que la maneja otro controlador
        $obligacionesPendientes = ObligacionTributaria::with(['cliente', 'creador'])
            ->whereDate('fecha_vencimiento_exacta', '>', $hoy) 
            ->whereDate('fecha_vencimiento_exacta', '<=', $fechaUmbral)
            ->where('estado', 'Pendiente')
            ->get();

        if ($obligacionesPendientes->isEmpty()) {
            $this->info('No hay obligaciones pendientes en rango de alerta.');
            return;
        }

        foreach ($obligacionesPendientes as $obligacion) {
        if ($obligacion->creador && $obligacion->creador->activo) {
            Mail::to($obligacion->creador->correo)
                ->send(new AlertaObligacionMail($obligacion, $obligacion->creador));

            
        }
    }

        $this->info('Recordatorios enviados con éxito.');
    }
}