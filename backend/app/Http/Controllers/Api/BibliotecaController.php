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

class BibliotecaController extends Controller
{
    /**
     * Obtener todo el árbol de carpetas y archivos de un CLIENTE
     */
    public function getArbolBiblioteca($cliente_id) 
    {
        $cliente = Cliente::withTrashed()
            ->with([
                // 1. Cargamos las subcarpetas con el filtro
                'periodos.subcarpetas' => function($query) {
                    $query->whereNull('parent_id') // Solo carpetas Nivel 3 (Raíz)
                          ->with([                 // 2. IMPORTANTE: Anidamos las relaciones hijas AQUÍ DENTRO
                              'subcarpetas.documentos.subidoPor', // Documentos Nivel 4
                              'documentos.subidoPor'              // Documentos Nivel 3
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

    public function storePeriodo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required|exists:clientes,id',
            'anio' => 'required|digits:4'
        ]);

        if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        // 1. Crear el Periodo
        $periodo = BibliotecaPeriodo::create([
            'cliente_id' => $request->cliente_id,
            'anio' => $request->anio,
            'creado_por_id' => Auth::id()
        ]);

        // 2. Crear Carpeta Principal "Obligaciones Tributarias" (NIVEL 3)
        $carpetaObligaciones = BibliotecaSubcarpeta::create([
            'periodo_id' => $periodo->id,
            'parent_id' => null,
            'nombre' => 'Obligaciones Tributarias',
            'creado_por_id' => Auth::id()
        ]);

        // 3. Crear Subcarpetas (NIVEL 4) según las obligaciones del cliente
        $obligaciones = \App\Models\ObligacionTributaria::where('cliente_id', $request->cliente_id)->get();
        
        foreach ($obligaciones as $obligacion) {
            BibliotecaSubcarpeta::create([
                'periodo_id' => $periodo->id,
                'parent_id' => $carpetaObligaciones->id, // Las metemos dentro de la carpeta principal
                'nombre' => $obligacion->tipo_impuesto,
                'creado_por_id' => Auth::id()
            ]);
        }

        // 4. Crear otra carpeta genérica de ejemplo (NIVEL 3)
        BibliotecaSubcarpeta::create([
            'periodo_id' => $periodo->id,
            'parent_id' => null,
            'nombre' => 'Estados Financieros',
            'creado_por_id' => Auth::id()
        ]);

        return response()->json(['message' => 'Periodo y carpetas creadas', 'periodo' => $periodo], 201);
    }

    /**
     * Crear una subcarpeta (Ej: Estados Financieros)
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
     * Eliminar Carpeta (Periodo o Subcarpeta)
     */
    public function deleteCarpeta($tipo, $id)
    {
        if ($tipo === 'periodo') {
            $carpeta = BibliotecaPeriodo::find($id);
        } elseif ($tipo === 'subcarpeta') {
            $carpeta = BibliotecaSubcarpeta::find($id);
            // Opcional: Borrar archivos físicos asociados a esta carpeta
            if (\Illuminate\Support\Facades\Storage::disk('public')->exists("biblioteca/subcarpeta_{$id}")) {
                \Illuminate\Support\Facades\Storage::disk('public')->deleteDirectory("biblioteca/subcarpeta_{$id}");
            }
        } else {
             return response()->json(['message' => 'Tipo de carpeta no válido', 'status' => 400], 400);
        }

        if (!$carpeta) {
            return response()->json(['message' => 'Carpeta no encontrada', 'status' => 404], 404);
        }

        // El OnDelete Cascade de tu base de datos borrará todo lo que esté adentro automáticamente
        $carpeta->delete();

        return response()->json(['message' => 'Carpeta eliminada con éxito', 'status' => 200], 200);
    }



    /**
     * Subir un Documento físico
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
        
        $tipo = 'otro';
        if($extension == 'pdf') $tipo = 'pdf';
        elseif(in_array($extension, ['xls', 'xlsx'])) $tipo = 'excel';
        elseif(in_array($extension, ['doc', 'docx'])) $tipo = 'word';

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
     * Eliminar Documento
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


}