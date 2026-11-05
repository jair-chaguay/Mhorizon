<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CampaignController extends Controller
{
    public function encolarEnvioManual(Request $request) {
        $request->validate([
            'asunto' => 'required|string',
            'cuerpo' => 'required|string',
            'etiqueta' => 'required|string|max:255',
            'nombre_provisional' => 'nullable|string|max:255',
            'adjuntos.*' => 'file|max:10240'
        ]);

        // El envío manual es solo por etiquetas, pero el worker de Python filtra por una fase exacta:
        // se encola una tarea por cada fase (0 a 5) que tenga prospectos con esas etiquetas. La 0 son los que no están en el flujo
        $etiquetas = array_values(array_filter(array_map('trim', explode(',', $request->etiqueta))));
        $fases = [];
        if (!empty($etiquetas)) {
            $fases = DB::table('leadss')
                ->whereBetween('fase', [0, 5])
                ->where(function ($query) use ($etiquetas) {
                    foreach ($etiquetas as $etiqueta) {
                        $query->orWhereJsonContains('etiquetas', $etiqueta);
                    }
                })
                ->distinct()
                ->orderBy('fase')
                ->pluck('fase')
                ->all();
        }
        if (empty($fases)) {
            return response()->json(['message' => 'Ningún prospecto activo tiene esas etiquetas'], 422);
        }

        $adjuntosRutas = [];
        if($request->hasFile('adjuntos')){
            foreach ($request->file('adjuntos') as $archivo){
                $ruta = $archivo->store('adjuntos_campanas', 'public');
                $adjuntosRutas[] = storage_path('app/public/' . $ruta);
            }
        }

        DB::table('tareas_envio')->insert(array_map(fn ($fase) => [
            'tipo' =>'manual',
            'fase_objetivo' =>$fase,
            // Etiquetas separadas por coma; el worker de Python solo envía a quienes tengan alguna
            'etiqueta_filtro'=>implode(',', $etiquetas),
            'asunto'=>$request->asunto,
            'cuerpo'=>$request->cuerpo,
            'adjuntos'=>json_encode($adjuntosRutas),
            'estado'=>'pendiente',
            'created_at'=>now(),
            'updated_at'=>now()
        ], $fases));

        $this->guardarNombreDeEnvio($request, $etiquetas, $fases);

        return response()->json(['message'=>'Campaña encolada para que Python la procese']);
    }

    // Nombre provisional del envío: el que escribió el usuario o "Campaña Etiquetas X Fase N"
    private function guardarNombreDeEnvio(Request $request, array $etiquetas, array $fases) {
        // Si aún no se corrió la migración de nombres provisionales, el envío sigue funcionando
        if (!Schema::hasTable('campaign_aliases')) {
            return;
        }

        // Debe coincidir con el campaign_name que registra email_manager.py (el asunto sin "Re:")
        $campaignName = trim(preg_replace('/^(re|rv|resp|fw|fwd)\s*:\s*/i', '', $request->asunto));
        $nombre = trim((string) $request->nombre_provisional);

        if ($nombre !== '') {
            DB::table('campaign_aliases')->updateOrInsert(
                ['campaign_name' => $campaignName],
                ['alias' => $nombre, 'updated_at' => now(), 'created_at' => now()]
            );
            return;
        }

        // El nombre automático no pisa uno que ya exista para ese asunto
        $fases = array_map('intval', $fases);
        $conFase = array_values(array_filter($fases));
        $partes = [];
        if (!empty($conFase)) {
            $partes[] = (count($conFase) === 1 ? 'Fase' : 'Fases') . ' ' . implode(', ', $conFase);
        }
        if (in_array(0, $fases, true)) {
            $partes[] = empty($conFase) ? 'Sin fases' : 'sin fases';
        }
        $automatico = 'Campaña Etiquetas ' . implode(', ', $etiquetas) . ' ' . implode(' y ', $partes);
        DB::table('campaign_aliases')->insertOrIgnore([
            'campaign_name' => $campaignName,
            'alias' => mb_substr($automatico, 0, 255),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function lanzarCampanaIA(Request $request){
        DB::table('tareas_envio')->insert([
            'tipo' =>'ia_autonoma',
            'fase_objetivo'=>0,
            'asunto'=> 'Generación Automática',
            'cuerpo'=>'Generación Automática',
            'estado' => 'pendiente',
            'created_at' => now(),
            'updated_at' =>now()
        ]);
        return response()->json(['message'=>'Motor de IA activado y encolado']);
    }

    // Guarda (o borra, si llega vacío) el nombre provisional de una campaña
    public function guardarAlias(Request $request){
        $request->validate([
            'campaign_name' => 'required|string|max:255',
            'alias' => 'nullable|string|max:255',
        ]);

        $alias = trim((string) $request->alias);
        if ($alias === '') {
            DB::table('campaign_aliases')->where('campaign_name', $request->campaign_name)->delete();
            return response()->json(['message' => 'Nombre provisional eliminado', 'alias' => null]);
        }

        DB::table('campaign_aliases')->updateOrInsert(
            ['campaign_name' => $request->campaign_name],
            ['alias' => $alias, 'updated_at' => now(), 'created_at' => now()]
        );
        return response()->json(['message' => 'Nombre provisional guardado', 'alias' => $alias]);
    }

}
