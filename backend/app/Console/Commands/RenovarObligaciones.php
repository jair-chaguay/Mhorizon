<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\ObligacionTributaria;
use Carbon\Carbon;

class RenovarObligaciones extends Command
{
    protected $signature = 'obligaciones:renovar';
    protected $description = 'Genera el siguiente ciclo para obligaciones presentadas y vencidas.';

    public function handle()
    {
        $hoy = Carbon::today()->format('Y-m-d');

        // Busca obligaciones que ya pasaron de fecha y están marcadas como "Presentado"
        $obligacionesVencidas = ObligacionTributaria::whereDate('fecha_vencimiento_exacta', '<', $hoy)
            ->where('estado', 'Presentado')
            ->get();

        foreach ($obligacionesVencidas as $obligacion) {
            $nuevaFecha = $obligacion->calcularProximoVencimiento();

            // Evitar duplicados
            $existe = ObligacionTributaria::where('cliente_id', $obligacion->cliente_id)
                ->where('tipo_impuesto', $obligacion->tipo_impuesto)
                ->whereDate('fecha_vencimiento_exacta', $nuevaFecha->format('Y-m-d'))
                ->exists();

            if (!$existe) {
                Carbon::setLocale('es');
                $nuevoTexto = ucfirst($nuevaFecha->translatedFormat('F Y'));

                ObligacionTributaria::create([
                    'cliente_id' => $obligacion->cliente_id,
                    'tipo_impuesto' => $obligacion->tipo_impuesto,
                    'fecha_presentacion' => $nuevoTexto,
                    'fecha_vencimiento_exacta' => $nuevaFecha->format('Y-m-d'),
                    'estado' => 'Pendiente'
                ]);
            }
        }
        $this->info("Obligaciones renovadas.");
    }
}