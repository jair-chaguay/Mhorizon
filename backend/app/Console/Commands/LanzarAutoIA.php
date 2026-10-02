<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;


class LanzarAutoIA extends Command
{
    protected $signature = 'campanas:auto';
    protected $description = 'Encola la revisión diaria de todas las fases para la IA';
    /**
     * Execute the console command.
     */
    public function handle()
    {
        for ($fase = 1; $fase <= 5; $fase++){
            DB::table('tareas_envio')->insert([
                'tipo'=>'ia_autonoma',
                'fase_objetivo'=>$fase,
                'asunto' => 'Generación Automática (Cron)',
                'cuerpo' => 'Revisión Diaria',
                'estado' => 'pendiente',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
        $this->info("Revisión diaria encolada correctamente");
    }
}
