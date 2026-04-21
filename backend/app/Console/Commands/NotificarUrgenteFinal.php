<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ObligacionTributaria;
use App\Models\Usuario;
use Illuminate\Support\Facades\Mail;
use App\Mail\AlertaObligacionMail;
use Carbon\Carbon;
/**
 * Comando de consola para enviar alertas críticas el día exacto del vencimiento.
 * * Este comando unifica las notificaciones del "Día Cero". Busca obligaciones
 * pendientes que vencen hoy y alerta simultáneamente a todo el equipo de 
 * administradores activos y al correo de jefatura configurado.
 */
class NotificarUrgenteFinal extends Command
{
    protected $signature = 'notificaciones:urgente-final';
    protected $description = 'Notifica a Admins y Jefe el mismo día del vencimiento';

    public function handle()
    {
        $hoy = Carbon::today()->format('Y-m-d');

        $obligaciones = ObligacionTributaria::with(['cliente', 'creador'])
            ->whereDate('fecha_vencimiento_exacta', $hoy)
            ->where('estado', 'Pendiente')
            ->get();

        if ($obligaciones->isEmpty()) return;

        $jefeCorreo = env('JEFE_CORREO');

        foreach ($obligaciones as $obligacion) {
            if ($obligacion->creador && $obligacion->creador->activo) {
            Mail::to($obligacion->creador->correo)
                ->send(new AlertaObligacionMail($obligacion, $obligacion->creador));
        }
            
            if ($jefeCorreo) {
                $adminGenerico = new Usuario(['nombre' => 'Jefe', 'apellido' => 'Supervisor']);
                Mail::to($jefeCorreo)->send(new AlertaObligacionMail($obligacion, $adminGenerico));
            }
        }
        $this->info('Alertas críticas enviadas.');
    }
}