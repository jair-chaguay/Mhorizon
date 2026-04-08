<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cliente; // 1. IMPORTANTE: Ahora usamos Cliente
use App\Models\BibliotecaPeriodo;
use App\Models\BibliotecaSubcarpeta;
use App\Models\Documento;
use App\Models\AuditoriaLog;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class BibliotecaController extends Controller
{
    /**
     * Obtener todo el árbol de carpetas y archivos de un CLIENTE
     */
    public function getArbolBiblioteca($cliente_id) // 2. CAMBIO: $cliente_id
    {
        $cliente = Cliente::with([
            'periodos.subcarpetas.documentos.subidoPor'
        ])->find($cliente_id);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);
        }

        // Auditoría silenciosa
        if (Auth::user()->rol->es_interno) {
            AuditoriaLog::registrar(
                'LEER',
                'clientes', // 3. CAMBIO: Tabla clientes
                $cliente->id,
                "Accedió a la biblioteca del cliente {$cliente->razon_social_nombres}" // 4. CAMBIO: razon_social_nombres
            );
        }

        return response()->json([
            'cliente' => $cliente->razon_social_nombres,
            // Forzamos a que si es null, devuelva un array vacío []
            'biblioteca' => $cliente->periodos ?? [],
            'status' => 200
        ], 200);
    }

    /**
     * Crear un nuevo periodo (Ej: 2026)
     */
    public function storePeriodo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required|exists:clientes,id', // 5. CAMBIO: Validar en tabla clientes
            'anio' => 'required|digits:4'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $periodo = BibliotecaPeriodo::create([
            'cliente_id' => $request->cliente_id, // 6. CAMBIO: Asignar cliente_id
            'anio' => $request->anio,
            'creado_por_id' => Auth::id()
        ]);

        AuditoriaLog::registrar('CREAR', 'biblioteca_periodos', $periodo->id, "Creó el periodo fiscal {$periodo->anio}");

        return response()->json(['message' => 'Periodo creado', 'periodo' => $periodo], 201);
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

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $subcarpeta = BibliotecaSubcarpeta::create([
            'periodo_id' => $request->periodo_id,
            'nombre' => $request->nombre,
            'creado_por_id' => Auth::id()
        ]);

        AuditoriaLog::registrar('CREAR', 'biblioteca_subcarpetas', $subcarpeta->id, "Creó la subcarpeta: {$subcarpeta->nombre}");

        return response()->json(['message' => 'Subcarpeta creada', 'subcarpeta' => $subcarpeta], 201);
    }

    /**
     * Subir un Documento físico
     */
    public function uploadDocumento(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subcarpeta_id' => 'required|exists:biblioteca_subcarpetas,id',
            'archivo' => 'required|file|mimes:pdf,xls,xlsx,doc,docx|max:15360', // Máx 15MB
            'observacion_cliente' => 'nullable|string'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $file = $request->file('archivo');
        $nombreOriginal = $file->getClientOriginalName();
        $extension = strtolower($file->getClientOriginalExtension());

        // Clasificar el icono para React
        $tipo = 'otro';
        if ($extension == 'pdf') $tipo = 'pdf';
        elseif (in_array($extension, ['xls', 'xlsx'])) $tipo = 'excel';
        elseif (in_array($extension, ['doc', 'docx'])) $tipo = 'word';

        // Guardar físicamente
        $ruta = $file->store("biblioteca/subcarpeta_{$request->subcarpeta_id}", 'public');

        $documento = Documento::create([
            'subcarpeta_id' => $request->subcarpeta_id,
            'subido_por_id' => Auth::id(),
            'nombre_archivo' => $nombreOriginal,
            'tipo' => $tipo,
            'url_archivo' => $ruta,
            'observacion_cliente' => $request->observacion_cliente
        ]);

        AuditoriaLog::registrar('CREAR', 'documentos', $documento->id, "Subió el archivo {$nombreOriginal}");

        $documento->load('subidoPor');

        return response()->json(['message' => 'Documento subido', 'documento' => $documento], 201);
    }

    /**
     * Eliminar Documento
     */
    public function deleteDocumento($id)
    {
        $documento = Documento::find($id);
        if (!$documento) return response()->json(['message' => 'No encontrado'], 404);

        if (Storage::disk('public')->exists($documento->url_archivo)) {
            Storage::disk('public')->delete($documento->url_archivo);
        }

        $nombre = $documento->nombre_archivo;
        $documento->delete();

        AuditoriaLog::registrar('ELIMINAR', 'documentos', $id, "Eliminó el archivo {$nombre}");

        return response()->json(['message' => 'Documento eliminado'], 200);
    }
}
