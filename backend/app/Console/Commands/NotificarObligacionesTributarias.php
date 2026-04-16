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
        $obligacionesPendientes = ObligacionTributaria::with('cliente')
            ->whereDate('fecha_vencimiento_exacta', '>', $hoy) 
            ->whereDate('fecha_vencimiento_exacta', '<=', $fechaUmbral)
            ->where('estado', 'Pendiente')
            ->get();

        if ($obligacionesPendientes->isEmpty()) {
            $this->info('No hay obligaciones pendientes en rango de alerta.');
            return;
        }

        $admins = Usuario::whereHas('rol', function ($query) {
            $query->where('nombre', 'like', '%admin%');
        })->where('activo', true)->get();

        if ($admins->isEmpty()) {
            $this->error('No se encontraron usuarios administradores activos.');
            return;
        }

        //Busca entre los usuarios a los administradores y envia el correo de alerta
        foreach ($obligacionesPendientes as $obligacion) {
            foreach ($admins as $admin) {
                Mail::to($admin->correo)
                    ->send(new AlertaObligacionMail($obligacion, $admin));
            }
        }

        $this->info('Recordatorios enviados con éxito.');
    }
}