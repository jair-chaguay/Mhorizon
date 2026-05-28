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
    /**
     * Obtiene el árbol completo de carpetas y archivos de un cliente.
     *
     * Carga de forma anidada: Cliente -> Periodos (Años) -> Subcarpetas Principales 
     * -> Subcarpetas Secundarias y Documentos.
     *
     * @param  int  $cliente_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getArbolBiblioteca($cliente_id) 
    {
        $cliente = Cliente::withTrashed()
            ->with([
                'periodos.subcarpetas' => function($query) {
                    $query->whereNull('parent_id') 
                          ->with([                 
                              'subcarpetas.documentos.subidoPor', 
                              'documentos.subidoPor'              
                          ]);
                }
            ])
            ->find($cliente_id);

        if(!$cliente) return response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);

        return response()->json([
            'cliente' => $cliente->razon_social_nombres,
            'biblioteca' => $cliente->periodos ?? [],
            'status' => 200
        ], 200);
    }


    /**
     * Crea un nuevo periodo (año) para un cliente con su estructura base.
     *
     * Genera automáticamente las carpetas "Obligaciones Tributarias" (y sus 
     * respectivas subcarpetas por tipo de impuesto) y "Estados Financieros".
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storePeriodo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required|exists:clientes,id',
            'anio' => 'required|digits:4'
        ]);

        if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);
        //Crea el período
        $periodo = BibliotecaPeriodo::create([
            'cliente_id' => $request->cliente_id,
            'anio' => $request->anio,
            'creado_por_id' => Auth::id()
        ]);
        //Crea las subcarpeta Obligaciones Tributarias
        $carpetaObligaciones = BibliotecaSubcarpeta::create([
            'periodo_id' => $periodo->id,
            'parent_id' => null,
            'nombre' => 'Obligaciones Tributarias',
            'creado_por_id' => Auth::id()
        ]);

        //Crea las subcarpetas para la carpeta Obligaciones tributarias segun las obligaciones que tenga asignadas el cliente
        $obligaciones = \App\Models\ObligacionTributaria::where('cliente_id', $request->cliente_id)->get();
        
        foreach ($obligaciones as $obligacion) {
            BibliotecaSubcarpeta::create([
                'periodo_id' => $periodo->id,
                'parent_id' => $carpetaObligaciones->id, 
                'nombre' => $obligacion->tipo_impuesto,
                'creado_por_id' => Auth::id()
            ]);
        }

        BibliotecaSubcarpeta::create([
            'periodo_id' => $periodo->id,
            'parent_id' => null,
            'nombre' => 'Estados Financieros',
            'creado_por_id' => Auth::id()
        ]);

        return response()->json(['message' => 'Periodo y carpetas creadas', 'periodo' => $periodo], 201);
    }

    /**
     * Crea una subcarpeta genérica dentro de un periodo.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeSubcarpeta(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'periodo_id' => 'required|exists:biblioteca_periodos,id',
            'nombre' => 'required|string|max:100'
        ]);

        if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $subcarpeta = BibliotecaSubcarpeta::create([
            'periodo_id' => $request->periodo_id,
            'nombre' => $request->nombre,
            'creado_por_id' => Auth::id()
        ]);

        return response()->json(['message' => 'Subcarpeta creada', 'subcarpeta' => $subcarpeta], 201);
    }

    /**
     * Elimina una carpeta (sea un Periodo completo o una Subcarpeta).
     *
     * Si es una subcarpeta, también elimina físicamente los archivos del disco (Storage).
     *
     * @param  string $tipo ('periodo' | 'subcarpeta')
     * @param  int    $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteCarpeta($tipo, $id)
    {
        if ($tipo === 'periodo') {
            $carpeta = BibliotecaPeriodo::find($id);
        } elseif ($tipo === 'subcarpeta') {
            $carpeta = BibliotecaSubcarpeta::find($id);
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists("biblioteca/subcarpeta_{$id}")) {
                \Illuminate\Support\Facades\Storage::disk('public')->deleteDirectory("biblioteca/subcarpeta_{$id}");
            }
        } else {
             return response()->json(['message' => 'Tipo de carpeta no válido', 'status' => 400], 400);
        }

        if (!$carpeta) {
            return response()->json(['message' => 'Carpeta no encontrada', 'status' => 404], 404);
        }

        $carpeta->delete();

        return response()->json(['message' => 'Carpeta eliminada con éxito', 'status' => 200], 200);
    }


    /**
     * Sube un documento genérico a una subcarpeta específica.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
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
        //Clasifica el tipo de archivo como pdf, excel o word y sus extensiones
        $tipo = 'otro';
        if($extension == 'pdf') $tipo = 'pdf';
        elseif(in_array($extension, ['xls', 'xlsx'])) $tipo = 'excel';
        elseif(in_array($extension, ['doc', 'docx'])) $tipo = 'word';

        //Lo guarda en el disco público
            $ruta = $file->store("biblioteca/subcarpeta_{$request->subcarpeta_id}", 'public');

        $documento = Documento::create([
            'subcarpeta_id' => $request->subcarpeta_id,
            'subido_por_id' => Auth::id(),
            'nombre_archivo' => $nombreOriginal,
            'tipo' => $tipo,
            'url_archivo' => $ruta,
            'observacion_cliente' => $request->observacion_cliente
        ]);

        $documento->load('subidoPor');

        return response()->json(['message' => 'Documento subido', 'documento' => $documento], 201);
    }


    /**
     * Sube un documento vinculado a una Obligación Tributaria específica.
     *
     * Este método automatiza el proceso: si las carpetas del año o del impuesto no 
     * existen, las crea. Además, actualiza el estado de la obligación a "Presentado"
     * y notifica al equipo.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadDocumentoObligacion(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'obligacion_id' => 'required|exists:obligaciones_tributarias,id',
            'archivo' => 'required|file|mimes:pdf,xls,xlsx,doc,docx|max:15360',
            'observacion_cliente' => 'nullable|string'
        ]);

        if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $obligacion = \App\Models\ObligacionTributaria::find($request->obligacion_id);
        
        $anioActual = date('Y');
        $periodo = BibliotecaPeriodo::firstOrCreate(
            ['cliente_id' => $obligacion->cliente_id, 'anio' => $anioActual],
            ['creado_por_id' => Auth::id() ?? 1]
        );

        $carpetaMadre = BibliotecaSubcarpeta::firstOrCreate(
            ['periodo_id' => $periodo->id, 'parent_id' => null, 'nombre' => 'Obligaciones Tributarias'],
            ['creado_por_id' => Auth::id() ?? 1]
        );

        $carpetaHija = BibliotecaSubcarpeta::firstOrCreate(
            ['periodo_id' => $periodo->id, 'parent_id' => $carpetaMadre->id, 'nombre' => $obligacion->tipo_impuesto],
            ['creado_por_id' => Auth::id() ?? 1]
        );

        $file = $request->file('archivo');
        $nombreOriginal = $file->getClientOriginalName();
        $extension = strtolower($file->getClientOriginalExtension());
        $tipo = in_array($extension, ['pdf']) ? 'pdf' : (in_array($extension, ['xls', 'xlsx']) ? 'excel' : 'word');
        
        $ruta = $file->store("biblioteca/subcarpeta_{$carpetaHija->id}", 'public');

        $documento = Documento::create([
            'subcarpeta_id' => $carpetaHija->id,
            'subido_por_id' => Auth::id() ?? 1,
            'nombre_archivo' => $nombreOriginal,
            'tipo' => $tipo,
            'url_archivo' => $ruta,
            'observacion_cliente' => $request->observacion_cliente
        ]);

        $obligacion->estado = 'Presentado';
        $obligacion->save();

        $admins = \App\Models\Usuario::whereHas('rol', function ($q) {
            $q->where('nombre', 'like', '%admin%');
        })->where('activo', true)->get();
        
        $jefeCorreo = env('JEFE_CORREO');

        foreach ($admins as $admin) {
            \Illuminate\Support\Facades\Mail::to($admin->correo)
                ->send(new \App\Mail\ObligacionSubidaMail($obligacion));
        }
        if ($jefeCorreo) {
             \Illuminate\Support\Facades\Mail::to($jefeCorreo)
                ->send(new \App\Mail\ObligacionSubidaMail($obligacion));
        }

        return response()->json(['message' => 'Obligación subida y notificada', 'documento' => $documento], 201);
    }

    
    /**
     * Elimina un documento específico de la base de datos y del disco físico.
     *
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
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
        if ($tipo === 'periodo') {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|digits:4'
            ]);

            if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

            $carpeta = BibliotecaPeriodo::find($id);
            if (!$carpeta) return response()->json(['message' => 'Periodo no encontrado', 'status' => 404], 404);

            $carpeta->anio = $request->nombre;
            $carpeta->save();

        } elseif ($tipo === 'subcarpeta') {
            $validator = Validator::make($request->all(), [
                'nombre' => 'required|string|max:100'
            ]);

            if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

            $carpeta = BibliotecaSubcarpeta::find($id);
            if (!$carpeta) return response()->json(['message' => 'Carpeta no encontrada', 'status' => 404], 404);

            $carpeta->nombre = $request->nombre;
            $carpeta->save();
            
        } else {
            return response()->json(['message' => 'Tipo de carpeta no válido', 'status' => 400], 400);
        }

        return response()->json(['message' => 'Carpeta actualizada con éxito', 'status' => 200], 200);
    }


}