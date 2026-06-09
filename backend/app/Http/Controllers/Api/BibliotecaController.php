<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cliente; 
use App\Models\BibliotecaPeriodo;
use App\Models\BibliotecaSubcarpeta;
use App\Models\Documento;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

/**
 * Controlador de la Biblioteca Virtual.
 * Gestiona el árbol de directorios (Periodos y Subcarpetas) y la carga/descarga 
 * de documentos físicos y tributarios para cada cliente.
 */
class BibliotecaController extends Controller
{
    public function getArbolBiblioteca($cliente_id) 
    {
        $cliente = Cliente::withTrashed()
            ->with([
                'carpetasRaiz' => function($query) {
                    $query->with([
                        // Cargamos hasta 4 niveles de profundidad para cubrir: Obligaciones -> Impuesto -> Año -> Mes
                        'subcarpetas.subcarpetas.subcarpetas.documentos.subidoPor',
                        'subcarpetas.subcarpetas.documentos.subidoPor',
                        'subcarpetas.documentos.subidoPor',
                        'documentos.subidoPor'
                    ]);
                }
            ])
            ->find($cliente_id);

        if(!$cliente) return response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);

        return response()->json([
            'cliente' => $cliente->razon_social_nombres,
            'biblioteca' => $cliente->carpetasRaiz ?? [],
            'status' => 200
        ], 200);
    }



    public function storePeriodo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required|exists:clientes,id',
            'anio' => 'required|string'
        ]);

        if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $carpetaRaiz = BibliotecaSubcarpeta::create([
            'cliente_id' => $request->cliente_id,
            'parent_id' => null,
            'nombre' => $request->anio,
            'creado_por_id' => Auth::id() ?? 1
        ]);

        return response()->json(['message' => 'Carpeta raíz creada', 'periodo' => $carpetaRaiz], 201);
    }

    public function storeSubcarpeta(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'periodo_id' => 'required|exists:biblioteca_subcarpetas,id', // Recibimos periodo_id del front
            'nombre' => 'required|string|max:100'
        ]);

        if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $subcarpeta = BibliotecaSubcarpeta::create([
            'parent_id' => $request->periodo_id, // Lo guardamos internamente como parent_id
            'nombre' => $request->nombre,
            'creado_por_id' => Auth::id() ?? 1
        ]);

        return response()->json(['message' => 'Subcarpeta creada', 'subcarpeta' => $subcarpeta], 201);
    }

    public function deleteCarpeta($tipo, $id)
    {
        $carpeta = BibliotecaSubcarpeta::find($id);

        if (!$carpeta) {
            return response()->json(['message' => 'Carpeta no encontrada', 'status' => 404], 404);
        }

        // Eliminamos el directorio físico
        if (Storage::disk('public')->exists("biblioteca/carpeta_{$id}")) {
            Storage::disk('public')->deleteDirectory("biblioteca/carpeta_{$id}");
        }

        $carpeta->delete();

        return response()->json(['message' => 'Carpeta eliminada con éxito', 'status' => 200], 200);
    }


    public function uploadDocumento(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subcarpeta_id' => 'required|exists:biblioteca_subcarpetas,id',
            'archivo' => 'required|file|mimes:pdf,xls,xlsx,doc,docx|max:15360',
            'observacion_cliente' => 'nullable|string'
        ]);

        if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $file = $request->file('archivo');
        $nombreOriginal = $file->getClientOriginalName();
        $extension = strtolower($file->getClientOriginalExtension());
        
        $tipo = 'otro';
        if($extension == 'pdf') $tipo = 'pdf';
        elseif(in_array($extension, ['xls', 'xlsx'])) $tipo = 'excel';
        elseif(in_array($extension, ['doc', 'docx'])) $tipo = 'word';

        $ruta = $file->store("biblioteca/carpeta_{$request->subcarpeta_id}", 'public');

        $documento = Documento::create([
            'subcarpeta_id' => $request->subcarpeta_id,
            'subido_por_id' => Auth::id() ?? 1,
            'nombre_archivo' => $nombreOriginal,
            'tipo' => $tipo,
            'url_archivo' => $ruta,
            'observacion_cliente' => $request->observacion_cliente
        ]);

        $documento->load('subidoPor');

        return response()->json(['message' => 'Documento subido', 'documento' => $documento], 201);
    }


    public function uploadDocumentoObligacion(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'obligacion_id' => 'required|exists:obligaciones_tributarias,id',
            'archivos' => 'required|array', // Recibimos el paquete de archivos
            'archivos.*' => 'file|mimes:pdf,xls,xlsx,doc,docx|max:15360',
            'nombres_slots' => 'required|array', // Recibimos los nombres de las categorías
            'observacion_cliente' => 'nullable|string'
        ]);

        if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $obligacion = \App\Models\ObligacionTributaria::find($request->obligacion_id);
        $userId = Auth::id() ?? 1;
        
        // 1. CARPETAS (Se mantiene tu lógica dinámica)
        $carpetaMadre = BibliotecaSubcarpeta::firstOrCreate(
            ['cliente_id' => $obligacion->cliente_id, 'parent_id' => null, 'nombre' => 'Obligaciones Tributarias'],
            ['creado_por_id' => $userId]
        );

        $carpetaImpuesto = BibliotecaSubcarpeta::firstOrCreate(
            ['parent_id' => $carpetaMadre->id, 'nombre' => $obligacion->tipo_impuesto],
            ['creado_por_id' => $userId]
        );

        $anio = \Carbon\Carbon::parse($obligacion->fecha_vencimiento_exacta)->format('Y');
        $carpetaAnio = BibliotecaSubcarpeta::firstOrCreate(
            ['parent_id' => $carpetaImpuesto->id, 'nombre' => $anio],
            ['creado_por_id' => $userId]
        );

        $tipoUpper = strtoupper(trim($obligacion->tipo_impuesto));
        $esMensual = str_contains($tipoUpper, 'MENSUAL');
        $esSemestral = in_array($tipoUpper, [
            'IVA (RÉGIMEN RIMPE)', 'IMPUESTO A LA RENTA (RÉGIMEN RIMPE SEMESTRAL)', 
            'RETENCIONES EN LA FUENTE DEL IR (RÉGIMEN RIMPE)', 'ANEXO TRANSACCIONAL SIMPLIFICADO - ATS (RÉGIMEN RIMPE)'
        ]);

        $carpetaDestino = $carpetaAnio; 

        if ($esMensual || $esSemestral) {
            $carpetaMes = BibliotecaSubcarpeta::firstOrCreate(
                ['parent_id' => $carpetaAnio->id, 'nombre' => $obligacion->fecha_presentacion],
                ['creado_por_id' => $userId]
            );
            $carpetaDestino = $carpetaMes;
        }

        // 2. GUARDAR TODOS LOS ARCHIVOS
        $archivosSubidos = [];
        $archivos = $request->file('archivos');
        $nombresSlots = $request->input('nombres_slots');

        foreach ($archivos as $index => $file) {
            $nombreOriginal = $file->getClientOriginalName();
            $extension = strtolower($file->getClientOriginalExtension());
            $tipo = in_array($extension, ['pdf']) ? 'pdf' : (in_array($extension, ['xls', 'xlsx']) ? 'excel' : 'word');
            
            $ruta = $file->store("biblioteca/carpeta_{$carpetaDestino->id}", 'public');

            // Formateamos la observación para saber de qué slot vino
            $slotAsignado = $nombresSlots[$index] ?? 'Anexo General';
            $obsFinal = "[{$slotAsignado}] " . ($request->observacion_cliente ? " - " . $request->observacion_cliente : '');

            $archivosSubidos[] = Documento::create([
                'subcarpeta_id' => $carpetaDestino->id,
                'subido_por_id' => $userId,
                'nombre_archivo' => $nombreOriginal,
                'tipo' => $tipo,
                'url_archivo' => $ruta,
                'observacion_cliente' => $obsFinal
            ]);
        }

        // 3. ACTUALIZAR ESTADO A PRESENTADO
        $obligacion->estado = 'Presentado';
        $obligacion->save();

        // 4. NOTIFICAR (Se envía una sola vez aunque haya 5 archivos)
        $admins = \App\Models\Usuario::whereHas('rol', function ($q) {
            $q->where('nombre', 'like', '%admin%');
        })->where('activo', true)->get();
        
        $jefeCorreo = env('JEFE_CORREO');

        foreach ($admins as $admin) {
            \Illuminate\Support\Facades\Mail::to($admin->correo)->send(new \App\Mail\ObligacionSubidaMail($obligacion));
        }
        if ($jefeCorreo) {
             \Illuminate\Support\Facades\Mail::to($jefeCorreo)->send(new \App\Mail\ObligacionSubidaMail($obligacion));
        }

        return response()->json(['message' => 'Obligación subida y completada', 'documentos' => $archivosSubidos], 201);
    }

    
    public function deleteDocumento($id)
    {
        $documento = Documento::find($id);
        if(!$documento) return response()->json(['message' => 'No encontrado'], 404);

        if(Storage::disk('public')->exists($documento->url_archivo)){
            Storage::disk('public')->delete($documento->url_archivo);
        }

        $documento->delete();

        return response()->json(['message' => 'Documento eliminado'], 200);
    }

    public function updateCarpeta(Request $request, $tipo, $id){
        $user = Auth::user();
        if (!$user || $user->rol_id !== 3) {
            return response()->json([
                'message' => 'Acceso denegado. Solo los usuarios autorizados pueden modificar carpetas.',
                'status' => 403
            ], 403);
        }
        
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:100'
        ]);

        if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $carpeta = BibliotecaSubcarpeta::find($id);
        if (!$carpeta) return response()->json(['message' => 'Carpeta no encontrada', 'status' => 404], 404);

        $carpeta->nombre = $request->nombre;
        $carpeta->save();
        
        return response()->json(['message' => 'Carpeta actualizada con éxito', 'status' => 200], 200);
    }


}