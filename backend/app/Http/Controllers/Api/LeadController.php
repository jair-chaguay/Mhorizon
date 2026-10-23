<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LeadController extends Controller
{
    // Campos de contacto que se editan desde la ficha del prospecto
    private const CAMPOS_CONTACTO = ['nombre', 'empresa', 'telefono', 'responsable', 'proxima_accion', 'proxima_fecha', 'notas'];

    public function index(){
        // Envíos, aperturas y clics viven en la tabla de tracking (leads); se unen por correo
        $leads = DB::table('leadss')
                    ->leftJoin('leads as tracking', 'tracking.email', '=', 'leadss.email')
                    ->select(
                        'leadss.id', 'leadss.email', 'leadss.nombre', 'leadss.empresa', 'leadss.telefono', 'leadss.responsable',
                        'leadss.proxima_accion', 'leadss.proxima_fecha', 'leadss.notas',
                        'leadss.fase', 'leadss.envios_fase_actual', 'leadss.status', 'leadss.etiquetas', 'leadss.created_at', 'leadss.updated_at',
                        DB::raw('COALESCE(tracking.sent, 0) as sent'),
                        DB::raw('COALESCE(tracking.opens, 0) as opens'),
                        DB::raw('COALESCE(tracking.clicks, 0) as clicks')
                    )
                    ->orderBy('leadss.id', 'desc')
                    ->get();
        return response()->json($leads);
    }

    public function actualizarContacto(Request $request){
        $request->validate([
            'email' => 'required|email',
            'nombre' => 'nullable|string|max:255',
            'empresa' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:50',
            'responsable' => 'nullable|string|max:255',
            'proxima_accion' => 'nullable|string|max:255',
            'proxima_fecha' => 'nullable|date',
            'notas' => 'nullable|string',
        ]);

        if (!DB::table('leadss')->where('email', $request->email)->exists()) {
            return response()->json(['error' => 'Prospecto no encontrado'], 404);
        }

        // Solo se actualizan los campos enviados; un texto vacío borra el dato
        $datos = [];
        foreach (self::CAMPOS_CONTACTO as $campo) {
            if ($request->has($campo)) {
                $valor = $request->input($campo);
                $datos[$campo] = is_string($valor) && trim($valor) === '' ? null : $valor;
            }
        }

        DB::table('leadss')->where('email', $request->email)->update($datos + ['updated_at' => now()]);
        return response()->json(['message' => 'Datos del prospecto actualizados']);
    }

    public function uploadCsv(Request $request){
        $request->validate([
            'csv_file'=>'required|file|mimes:csv,txt',
            'etiquetas'=> 'nullable|string'
        ]);
        $etiquetasNuevas = [];
        if($request->etiquetas){
            $etiquetasNuevas = array_map('trim', explode(',', $request->etiquetas));
        }
        $path = $request->file('csv_file')->getRealPath();
        $fileContent = file($path);

        if (empty($fileContent)){
            return response()->json(['error'=>'El archivo CSV esta vacio'], 400);
        }
        $datos = array_map('str_getcsv',$fileContent);
        $encabezado = array_shift($datos);

        // Si el encabezado trae columnas conocidas (email/correo, nombre, empresa, telefono) se usan;
        // si no, el correo se toma de la primera columna como antes
        $columnas = [];
        foreach ($encabezado as $i => $titulo) {
            $titulo = strtolower(trim(preg_replace('/^\xEF\xBB\xBF/', '', $titulo)));
            $titulo = strtr($titulo, ['é' => 'e', 'ó' => 'o', 'í' => 'i', 'á' => 'a', 'ú' => 'u']);
            if (in_array($titulo, ['email', 'correo', 'correo electronico', 'e-mail'])) $columnas['email'] = $i;
            elseif ($titulo === 'nombre') $columnas['nombre'] = $i;
            elseif ($titulo === 'empresa') $columnas['empresa'] = $i;
            elseif (in_array($titulo, ['telefono', 'celular'])) $columnas['telefono'] = $i;
        }
        $colEmail = $columnas['email'] ?? 0;

        foreach ($datos as $fila){
            if (empty(trim($fila[$colEmail] ?? ''))){
                continue;
            }
            $email = trim($fila[$colEmail]);

            // Datos de contacto del archivo (solo los que vienen con valor)
            $contacto = [];
            foreach (['nombre', 'empresa', 'telefono'] as $campo) {
                if (isset($columnas[$campo]) && trim($fila[$columnas[$campo]] ?? '') !== '') {
                    $contacto[$campo] = trim($fila[$columnas[$campo]]);
                }
            }

            $lead = DB::table('leadss')->where('email', $email)->first();

            if($lead){
                $etiquetasActuales = $lead->etiquetas ? json_decode($lead->etiquetas, true) : [];
                $etiquetasFinales = array_values(array_unique(array_merge($etiquetasActuales, $etiquetasNuevas)));
                DB::table('leadss')->where('email', $email)->update($contacto + [
                    'etiquetas'=>json_encode($etiquetasFinales),
                    'updated_at'=>now()
                ]);
            }else{
                DB::table('leadss')->insert($contacto + [
                    'email' => $email,
                    'fase'=> 1,
                    'status' =>'Pendiente',
                    'etiquetas'=>json_encode($etiquetasNuevas),
                    'created_at'=>now(),
                    'updated_at'=>now()
                ]);
            }
        }
        return response()->json(['message'=>'Base de datos cargada y sincronizada correctamente.']);
    }

    public function agregarEtiquetaManual(Request $request){
        $request->validate([
            'email' => 'required|email',
            'etiquetas'=> 'required|string'
        ]);

        $lead = DB::table('leadss')->where('email', $request->email)->first();
        if($lead){
            $etiquetasNuevas = array_map('trim', explode(',', $request->etiquetas));
            $etiquetasActuales = $lead->etiquetas ? json_decode($lead->etiquetas, true): [];

            $etiquetasFinales = array_values(array_unique(array_merge($etiquetasActuales, $etiquetasNuevas)));

            DB::table('leadss')->where('email',$request->email)->update([
                'etiquetas'=>json_encode($etiquetasFinales),
                'updated_at'=>now()
            ]);
            return response()->json(['message'=>'Etiqueta agregada correctamente']);
        }
        return response()->json(['error'=>'Prospecto no encontrado'], 404);
    }

    public function eliminarProspectosPorEtiqueta(Request $request) {
        $request->validate(['etiqueta' => 'required|string']);

        // Busca todos los leads que contengan esa etiqueta en su JSON y los elimina
        $eliminados = DB::table('leadss')
            ->where('etiquetas', 'LIKE', '%"' . $request->etiqueta . '"%')
            ->delete();

        return response()->json([
            'message' => "Se eliminaron $eliminados prospectos con la etiqueta '{$request->etiqueta}'"
        ]);
    }

    public function quitarEtiquetaMasiva(Request $request){
        $request->validate([
            'emails' => 'required|array', 
            'emails.*' => 'email',
            'etiqueta' => 'required|string'
        ]);
        $leads = DB::table('leadss')->whereIn('email', $request->emails)->get();

        $actualizados = 0;

        foreach ($leads as $lead) {
            if ($lead->etiquetas) {
                $etiquetasActuales = json_decode($lead->etiquetas, true);
                
                if (in_array($request->etiqueta, $etiquetasActuales)) {
                    $etiquetasFinales = array_values(array_filter($etiquetasActuales, function($t) use ($request) {
                        return $t !== $request->etiqueta;
                    }));

                    DB::table('leadss')->where('id', $lead->id)->update([
                        'etiquetas' => json_encode($etiquetasFinales),
                        'updated_at' => now()
                    ]);
                    $actualizados++;
                }
            }
        }

        return response()->json([
            'message' => "Etiqueta '{$request->etiqueta}' eliminada correctamente de $actualizados prospectos."
        ]);
    }

    public function quitarEtiqueta(Request $request){
        $request->validate(['email'=>'required|email', 'etiqueta'=>'required|string']);
        $lead = DB::table('leadss')->where('email', $request->email)->first();

        if($lead && $lead->etiquetas){
            $etiquetasActuales = json_decode($lead->etiquetas, true);

            $etiquetasFinales = array_values(array_filter($etiquetasActuales, function($t) use ($request){
                return $t !== $request->etiqueta;
            }));

            DB::table('leadss')->where('email', $request->email)->update([
                'etiquetas'=>json_encode($etiquetasFinales),
                'updated_at'=>now()
            ]);
            return response()->json(['message'=>'Etiqueta eliminada']);
        }
        return response()->json(['error'=>'Prospecto no encontrado'], 404);
    }

    public function eliminarProspecto(Request $request){
        $request->validate([
            'email'=>'required|email'
        ]);

        $eliminado = DB::table('leadss')->where('email', $request->email)->delete();

        if($eliminado){
            return response()->json(['message'=>'Prospecto eliminado correctamente']);
        }

        return response()->json(['error'=>'Prospecto no encontrado'], 404);
    }
}