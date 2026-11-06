<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class CampaignController extends Controller
{
    public function encolarEnvioManual(Request $request) {
        $request->validate([
            'asunto' => 'required|string',
            'cuerpo' => 'required|string',
            'etiqueta' => 'required|string|max:255',
            'nombre_provisional' => 'nullable|string|max:255',
            'formato' => 'nullable|in:personal,campana',
            'diseno' => 'nullable|json',
            'remitente_id' => 'nullable|integer',
            'remitente_nombre' => 'nullable|string|max:120',
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

        // Gmail y Outlook no muestran imágenes incrustadas (data:image): se publican y se cambian por su enlace
        $cuerpo = $this->publicarImagenes($request->cuerpo);
        $extra = Schema::hasColumn('tareas_envio', 'formato') ? ['formato' => $request->input('formato', 'personal')] : [];

        // Diseño (bloques del editor) para poder reutilizarlo después; sus imágenes también se publican
        if (Schema::hasColumn('tareas_envio', 'diseno') && $request->filled('diseno')) {
            $extra['diseno'] = $this->publicarImagenes($request->diseno);
        }

        // Remitente: la cuenta elegida (o la predeterminada) y el nombre que verá el destinatario
        if (Schema::hasColumn('tareas_envio', 'remitente_id') && Schema::hasTable('remitentes')) {
            $remitente = $request->filled('remitente_id')
                ? DB::table('remitentes')->where('id', $request->remitente_id)->first()
                : DB::table('remitentes')->orderByDesc('predeterminado')->orderBy('id')->first();
            if ($request->filled('remitente_id') && !$remitente) {
                return response()->json(['message' => 'El remitente elegido ya no existe'], 422);
            }
            if ($remitente) {
                $nombre = trim((string) $request->remitente_nombre);
                $extra += [
                    'remitente_id' => $remitente->id,
                    'remitente_email' => $remitente->email,
                    'remitente_nombre' => $nombre !== '' ? $nombre : $remitente->nombre,
                ];
            }
        }

        DB::table('tareas_envio')->insert(array_map(fn ($fase) => $extra + [
            'tipo' =>'manual',
            'fase_objetivo' =>$fase,
            // Etiquetas separadas por coma; el worker de Python solo envía a quienes tengan alguna
            'etiqueta_filtro'=>implode(',', $etiquetas),
            'asunto'=>$request->asunto,
            'cuerpo'=>$cuerpo,
            'adjuntos'=>json_encode($adjuntosRutas),
            'estado'=>'pendiente',
            'created_at'=>now(),
            'updated_at'=>now()
        ], $fases));

        $this->guardarNombreDeEnvio($request, $etiquetas, $fases);

        return response()->json(['message'=>'Campaña encolada para que Python la procese']);
    }

    // Las imágenes subidas en el editor (y las del pie: logo e íconos de redes) llegan en base64.
    // Se guardan en storage/app/public/campanas/img con el hash como nombre, así la misma imagen se guarda una sola vez
    private function publicarImagenes(string $cuerpo): string {
        return preg_replace_callback('#data:image/(png|jpe?g|gif|webp);base64,([A-Za-z0-9+/=]++)#', function ($m) {
            $bytes = base64_decode($m[2], true);
            if ($bytes === false) {
                return '';
            }
            $ext = $m[1] === 'jpeg' ? 'jpg' : $m[1];
            $ruta = 'campanas/img/' . sha1($bytes) . '.' . $ext;
            if (!Storage::disk('public')->exists($ruta)) {
                Storage::disk('public')->put($ruta, $bytes);
            }
            // Requiere `php artisan storage:link` y APP_URL con el dominio público (https)
            return asset('storage/' . $ruta);
        }, $cuerpo) ?? $cuerpo;
    }

    // Nombre provisional del envío: el que escribió el usuario o "Campaña Etiquetas X Fase N"
    private function guardarNombreDeEnvio(Request $request, array $etiquetas, array $fases) {
        // Si aún no se corrió la migración de nombres provisionales, el envío sigue funcionando
        if (!Schema::hasTable('campaign_aliases')) {
            return;
        }

        $campaignName = self::nombreDeCampana($request->asunto);
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

    // Debe coincidir con el campaign_name que registra email_manager.py (el asunto sin "Re:")
    public static function nombreDeCampana($asunto): string {
        return trim(preg_replace('/^(re|rv|resp|fw|fwd)\s*:\s*/i', '', (string) $asunto));
    }

    // Difusiones ya enviadas cuyo diseño se puede reutilizar (la más reciente de cada campaña)
    public function reutilizables() {
        $conFormato = Schema::hasColumn('tareas_envio', 'formato');
        $conDiseno = Schema::hasColumn('tareas_envio', 'diseno');
        $tareas = DB::table('tareas_envio')
            ->where('tipo', 'manual')
            ->orderByDesc('id')
            ->get(array_merge(['asunto', 'created_at'],
                [$conFormato ? 'formato' : DB::raw('NULL as formato')],
                [$conDiseno ? DB::raw('diseno IS NOT NULL as con_diseno') : DB::raw('0 as con_diseno')]));
        $alias = Schema::hasTable('campaign_aliases') ? DB::table('campaign_aliases')->pluck('alias', 'campaign_name') : collect();

        $lista = [];
        foreach ($tareas as $t) {
            $nombre = self::nombreDeCampana($t->asunto);
            if ($nombre === '' || isset($lista[$nombre])) {
                continue;
            }
            $formato = $t->formato ?: 'personal';
            $lista[$nombre] = [
                'nombre' => $nombre,
                'alias' => $alias[$nombre] ?? null,
                'formato' => $formato,
                'fecha' => $t->created_at,
                // Las campañas con diseño enviadas antes de guardar los bloques no se pueden abrir en el editor
                'reutilizable' => $formato === 'personal' || (bool) $t->con_diseno,
            ];
        }
        return response()->json(array_values($lista));
    }

    // El diseño de una difusión enviada: cuerpo del correo personal o bloques y estilos del correo con diseño
    public function diseno(Request $request) {
        $request->validate(['nombre' => 'required|string|max:255']);
        $conDiseno = Schema::hasColumn('tareas_envio', 'diseno');
        $tareas = DB::table('tareas_envio')->where('tipo', 'manual')->orderByDesc('id')->cursor();
        foreach ($tareas as $t) {
            if (self::nombreDeCampana($t->asunto) !== $request->nombre) {
                continue;
            }
            $formato = ($t->formato ?? null) ?: 'personal';
            $diseno = $conDiseno && $t->diseno ? json_decode($t->diseno, true) : null;
            if ($formato === 'campana' && !$diseno) {
                return response()->json(['message' => 'Esta campaña se envió antes de que se guardara su diseño y no se puede abrir en el editor'], 422);
            }
            return response()->json([
                'nombre' => $request->nombre,
                'formato' => $formato,
                'cuerpo' => $formato === 'personal' ? $t->cuerpo : null,
                'diseno' => $diseno,
            ]);
        }
        return response()->json(['message' => 'No se encontró esa campaña'], 404);
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
