<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ObligacionTributaria;
use App\Models\Usuario;
use Illuminate\Support\Facades\Mail;
use App\Mail\AlertaObligacionMail;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log; // <-- Importamos Log

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
        Log::info('Iniciando comando notificaciones:urgente-final (Día Cero)');

        $hoy = Carbon::today()->format('Y-m-d');

        $obligaciones = ObligacionTributaria::with(['cliente', 'creador'])
            ->whereDate('fecha_vencimiento_exacta', $hoy)
            ->where('estado', 'Pendiente')
            ->get();

        if ($obligaciones->isEmpty()) {
            Log::info('notificaciones:urgente-final finalizado: Sin vencimientos para hoy.');
            return;
        }

        $jefeCorreo = env('JEFE_CORREO');
        $contadorObligaciones = 0;

        foreach ($obligaciones as $obligacion) {
            $contadorObligaciones++;

            // 1. Envío al creador/cliente (Corporativo + Personal)
            if ($obligacion->creador && $obligacion->creador->activo) {
                $destinatarios = [$obligacion->creador->correo];

                if (!empty($obligacion->creador->correo_personal)) {
                    $destinatarios[] = $obligacion->creador->correo_personal;
                }

                Mail::to($destinatarios)
                    ->send(new AlertaObligacionMail($obligacion, $obligacion->creador));
                
                Log::warning("Alerta URGENTE de obligación ID {$obligacion->id} enviada al creador: " . implode(', ', $destinatarios));
            }
            
            // 2. Envío a Jefatura/Supervisión
            if ($jefeCorreo) {
                $adminGenerico = new Usuario(['nombre' => 'Jefe', 'apellido' => 'Supervisor']);
                Mail::to($jefeCorreo)->send(new AlertaObligacionMail($obligacion, $adminGenerico));
                
                Log::warning("Copia de alerta URGENTE de obligación ID {$obligacion->id} enviada a Jefatura: {$jefeCorreo}");
            }
        }

        $mensajeFinal = "Alertas críticas enviadas. Total procesadas: {$contadorObligaciones}.";
        $this->info($mensajeFinal);
        Log::info("notificaciones:urgente-final finalizado: " . $mensajeFinal);
    }
}