<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class CampaignController extends Controller
{
    private const MAX_DESTINATARIOS_PRUEBA = 5;

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

        // Gmail y Outlook no muestran imágenes incrustadas (data:image): se publican y se cambian por su enlace
        $cuerpo = $this->publicarImagenes($request->cuerpo);
        $extra = Schema::hasColumn('tareas_envio', 'formato') ? ['formato' => $request->input('formato', 'personal')] : [];

        // Diseño (bloques del editor) para poder reutilizarlo después; sus imágenes también se publican
        if (Schema::hasColumn('tareas_envio', 'diseno') && $request->filled('diseno')) {
            $extra['diseno'] = $this->publicarImagenes($request->diseno);
        }

        $remitente = $this->datosRemitente($request);
        if ($remitente === null) {
            return response()->json(['message' => 'El remitente elegido ya no existe'], 422);
        }
        $extra += $remitente;
        $adjuntosRutas = $this->guardarAdjuntos($request);

        // Cada difusión es su propia campaña, aunque repita el asunto de otra ("Asunto (2)", "Asunto (3)"...).
        // Todas las tareas de este envío (una por fase) comparten el mismo nombre
        $campaignName = $this->nombreUnicoDeCampana($request->asunto);
        if (Schema::hasColumn('tareas_envio', 'nombre_campana')) {
            $extra['nombre_campana'] = $campaignName;
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

        $this->guardarNombreDeEnvio($request, $campaignName, $etiquetas, $fases);

        return response()->json(['message'=>'Campaña encolada para que Python la procese']);
    }

    // Correo de prueba de Difusión manual: el mismo correo, solo a las direcciones escritas.
    // Es una tarea tipo 'prueba': no es campaña (el dashboard solo lee las 'manual') y el worker no la registra
    public function enviarPrueba(Request $request) {
        $request->validate([
            'asunto' => 'required|string',
            'cuerpo' => 'required|string',
            'destinatarios' => 'required|string|max:500',
            'formato' => 'nullable|in:personal,campana',
            'remitente_id' => 'nullable|integer',
            'remitente_nombre' => 'nullable|string|max:120',
            'adjuntos.*' => 'file|max:10240'
        ]);

        if (!Schema::hasColumn('tareas_envio', 'destinatarios_prueba')) {
            return response()->json(['message' => 'Falta ejecutar php artisan migrate en el servidor'], 422);
        }

        $destinatarios = array_values(array_unique(array_filter(preg_split('/[\s,;]+/', strtolower($request->destinatarios)))));
        $invalidos = array_filter($destinatarios, fn ($d) => !filter_var($d, FILTER_VALIDATE_EMAIL));
        if (empty($destinatarios) || !empty($invalidos)) {
            return response()->json(['message' => 'Revisa los correos: ' . (implode(', ', $invalidos) ?: 'no escribiste ninguno')], 422);
        }
        if (count($destinatarios) > self::MAX_DESTINATARIOS_PRUEBA) {
            return response()->json(['message' => 'Máximo ' . self::MAX_DESTINATARIOS_PRUEBA . ' correos por prueba'], 422);
        }

        $remitente = $this->datosRemitente($request);
        if ($remitente === null) {
            return response()->json(['message' => 'El remitente elegido ya no existe'], 422);
        }
        $extra = $remitente + (Schema::hasColumn('tareas_envio', 'formato') ? ['formato' => $request->input('formato', 'personal')] : []);

        DB::table('tareas_envio')->insert($extra + [
            'tipo' => 'prueba',
            'fase_objetivo' => 0,
            'destinatarios_prueba' => implode(',', $destinatarios),
            'asunto' => $request->asunto,
            'cuerpo' => $this->publicarImagenes($request->cuerpo),
            'adjuntos' => json_encode($this->guardarAdjuntos($request)),
            'estado' => 'pendiente',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return response()->json(['message' => 'Correo de prueba encolado', 'destinatarios' => $destinatarios]);
    }

    // Remitente: la cuenta elegida (o la predeterminada) y el nombre que verá el destinatario.
    // Devuelve null si el remitente elegido ya no existe; vacío si el servidor aún no tiene remitentes
    private function datosRemitente(Request $request): ?array {
        if (!Schema::hasColumn('tareas_envio', 'remitente_id') || !Schema::hasTable('remitentes')) {
            return [];
        }
        $remitente = $request->filled('remitente_id')
            ? DB::table('remitentes')->where('id', $request->remitente_id)->first()
            : DB::table('remitentes')->orderByDesc('predeterminado')->orderBy('id')->first();
        if ($request->filled('remitente_id') && !$remitente) {
            return null;
        }
        if (!$remitente) {
            return [];
        }
        $nombre = trim((string) $request->remitente_nombre);
        return [
            'remitente_id' => $remitente->id,
            'remitente_email' => $remitente->email,
            'remitente_nombre' => $nombre !== '' ? $nombre : $remitente->nombre,
        ];
    }

    private function guardarAdjuntos(Request $request): array {
        $adjuntosRutas = [];
        if($request->hasFile('adjuntos')){
            foreach ($request->file('adjuntos') as $archivo){
                $ruta = $archivo->store('adjuntos_campanas', 'public');
                $adjuntosRutas[] = storage_path('app/public/' . $ruta);
            }
        }
        return $adjuntosRutas;
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
    private function guardarNombreDeEnvio(Request $request, string $campaignName, array $etiquetas, array $fases) {
        // Si aún no se corrió la migración de nombres provisionales, el envío sigue funcionando
        if (!Schema::hasTable('campaign_aliases')) {
            return;
        }

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

    // Campaña de una tarea manual: la que se le asignó al encolarla o, en envíos anteriores a ese cambio, su asunto
    public static function campanaDeTarea($tarea): string {
        return ($tarea->nombre_campana ?? null) ?: self::nombreDeCampana($tarea->asunto);
    }

    // campaign_name para una difusión nueva: el asunto, o "Asunto (2)", "Asunto (3)"... si ya hay una campaña con ese nombre
    private function nombreUnicoDeCampana($asunto): string {
        $base = mb_substr(self::nombreDeCampana($asunto), 0, 240);
        // Sin la migración no hay dónde guardar el nombre: se mantiene el comportamiento anterior
        if (!Schema::hasColumn('tareas_envio', 'nombre_campana')) {
            return $base;
        }
        $nombre = $base;
        for ($n = 2; $this->campanaEnUso($nombre); $n++) {
            $nombre = "$base ($n)";
        }
        return $nombre;
    }

    // Ya enviada (tiene registros) o encolada y aún sin enviar
    private function campanaEnUso(string $nombre): bool {
        if (DB::table('email_logs')->where('campaign_name', $nombre)->exists()) {
            return true;
        }
        return DB::table('tareas_envio')
            ->where('tipo', 'manual')
            ->where(function ($q) use ($nombre) {
                $q->where('nombre_campana', $nombre)
                  ->orWhere(fn ($q2) => $q2->whereNull('nombre_campana')->where('asunto', $nombre));
            })
            ->exists();
    }

    // Difusiones ya enviadas cuyo diseño se puede reutilizar (la más reciente de cada campaña)
    public function reutilizables() {
        $conFormato = Schema::hasColumn('tareas_envio', 'formato');
        $conDiseno = Schema::hasColumn('tareas_envio', 'diseno');
        $tareas = DB::table('tareas_envio')
            ->where('tipo', 'manual')
            ->orderByDesc('id')
            ->get(array_merge(['asunto', 'created_at'],
                [Schema::hasColumn('tareas_envio', 'nombre_campana') ? 'nombre_campana' : DB::raw('NULL as nombre_campana')],
                [$conFormato ? 'formato' : DB::raw('NULL as formato')],
                [$conDiseno ? DB::raw('diseno IS NOT NULL as con_diseno') : DB::raw('0 as con_diseno')]));
        $alias = Schema::hasTable('campaign_aliases') ? DB::table('campaign_aliases')->pluck('alias', 'campaign_name') : collect();

        $lista = [];
        foreach ($tareas as $t) {
            $nombre = self::campanaDeTarea($t);
            if ($nombre === '' || isset($lista[$nombre])) {
                continue;
            }
            $formato = $t->formato ?: 'personal';
            $lista[$nombre] = [
                'nombre' => $nombre,
                'asunto' => self::nombreDeCampana($t->asunto),
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
            if (self::campanaDeTarea($t) !== $request->nombre) {
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

    // Borra una o varias campañas del dashboard: sus registros (envíos, aperturas, clics, rebotes, bajas),
    // su nombre provisional y, si es una difusión manual, su tarea (deja de aparecer en "Reutilizar").
    // Los prospectos no se tocan: siguen en su fase, con sus etiquetas y su estado
    public function eliminarCampanas(Request $request){
        $request->validate([
            'nombres' => 'required|array|min:1',
            'nombres.*' => 'string|max:255',
        ]);
        $nombres = array_values(array_unique($request->nombres));

        // Una difusión que todavía se está enviando no se puede borrar (sus registros seguirían llegando)
        $tareas = DB::table('tareas_envio')->where('tipo', 'manual')->get();
        $enCurso = $tareas->filter(fn ($t) => in_array($t->estado, ['pendiente', 'procesando'], true) && in_array(self::campanaDeTarea($t), $nombres, true));
        if ($enCurso->isNotEmpty()) {
            return response()->json(['message' => 'Hay una campaña que todavía se está enviando. Espera a que termine para borrarla.'], 422);
        }

        DB::transaction(function () use ($nombres, $tareas) {
            // Se descuentan de cada prospecto las aperturas y clics de esas campañas
            $conteos = DB::table('email_logs')
                ->whereIn('campaign_name', $nombres)
                ->whereIn('event_type', ['open', 'click'])
                ->select('email',
                    DB::raw("SUM(event_type = 'open') as aperturas"),
                    DB::raw("SUM(event_type = 'click') as clics"))
                ->groupBy('email')
                ->get();
            foreach ($conteos as $c) {
                DB::table('leads')->where('email', $c->email)->update([
                    'opens' => DB::raw('GREATEST(opens - ' . (int) $c->aperturas . ', 0)'),
                    'clicks' => DB::raw('GREATEST(clicks - ' . (int) $c->clics . ', 0)'),
                ]);
            }

            // link_clicks no guarda la campaña: se borran los clics que coinciden con los de esas campañas
            $clics = DB::table('email_logs')->whereIn('campaign_name', $nombres)->where('event_type', 'click')->get(['email', 'url', 'created_at']);
            foreach ($clics as $clic) {
                DB::table('link_clicks')->where('email', $clic->email)->where('url', $clic->url)->where('created_at', $clic->created_at)->limit(1)->delete();
            }

            DB::table('email_logs')->whereIn('campaign_name', $nombres)->delete();
            if (Schema::hasTable('campaign_aliases')) {
                DB::table('campaign_aliases')->whereIn('campaign_name', $nombres)->delete();
            }
            $ids = $tareas->filter(fn ($t) => in_array(self::campanaDeTarea($t), $nombres, true))->pluck('id');
            if ($ids->isNotEmpty()) {
                DB::table('tareas_envio')->whereIn('id', $ids)->delete();
            }
        });

        return response()->json(['message' => count($nombres) === 1 ? 'Campaña eliminada' : count($nombres) . ' campañas eliminadas']);
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
