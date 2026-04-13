<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ObligacionTributaria;
use App\Models\Usuario;
use Illuminate\Support\Facades\Mail;
use App\Mail\AlertaObligacionMail;
use Carbon\Carbon;

class NotificarObligacionesTributarias extends Command
{
    protected $signature = 'notificaciones:tributarias';
    protected $description = 'Envía recordatorios diarios para obligaciones a 5 días o menos de vencer';

    public function handle()
    {
        // 1. Fecha umbral: Hoy + 5 días
        $fechaUmbral = Carbon::now()->addDays(5)->format('Y-m-d');

        // 2. Buscar pendientes cuya fecha exacta sea MENOR O IGUAL al umbral
        $obligacionesPendientes = ObligacionTributaria::with('cliente')
            ->whereDate('fecha_vencimiento_exacta', '<=', $fechaUmbral)
            ->where('estado', 'Pendiente')
            ->get();

        if ($obligacionesPendientes->isEmpty()) {
            $this->info('No hay obligaciones pendientes en rango de alerta.');
            return;
        }

        // 3. Obtener admins (Ajusta el 'where' según cómo identifiques a tu admin. 
        // Aquí asumo que existe un rol "Admin" o el rol_id = 1)
        $admins = Usuario::whereHas('rol', function ($query) {
            $query->where('nombre', 'like', '%admin%'); // O usar ->where('rol_id', 1)
        })->where('activo', true)->get();

        if ($admins->isEmpty()) {
            $this->error('No se encontraron usuarios administradores activos.');
            return;
        }

        // 4. Enviar correos
        foreach ($obligacionesPendientes as $obligacion) {
            foreach ($admins as $admin) {
                Mail::to($admin->correo)->send(new AlertaObligacionMail($obligacion, $admin));
            }
        }

        $this->info('Recordatorios enviados con éxito.');
    }
}