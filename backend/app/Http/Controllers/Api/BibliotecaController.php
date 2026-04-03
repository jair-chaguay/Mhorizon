<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empresa;
use App\Models\BibliotecaPeriodo;
use App\Models\BibliotecaSubcarpeta;
use App\Models\Documento;
use App\Models\AuditoriaLog; 
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class BibliotecaController extends Controller
{
 
    public function getArbolBiblioteca($empresa_id)
    {
        $empresa = Empresa::with([
            'periodos.subcarpetas.documentos.subidoPor'
        ])->find($empresa_id);

        if(!$empresa){
            return response()->json(['message' => 'Empresa no encontrada', 'status' => 404], 404);
        }

        if(Auth::user()->rol->es_interno) {
            AuditoriaLog::registrar('LEER', 'empresas', $empresa->id, "Accedió a la biblioteca del cliente {$empresa->razon_social}");
        }

        return response()->json([
            'empresa' => $empresa->razon_social,
            'biblioteca' => $empresa->periodos,
            'status' => 200
        ], 200);
    }

    
    public function storePeriodo(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'empresa_id' => 'required|exists:empresas,id',
            'anio' => 'required|digits:4'
        ]);

        if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $periodo = BibliotecaPeriodo::create([
            'empresa_id' => $request->empresa_id,
            'anio' => $request->anio,
            'creado_por_id' => Auth::id()
        ]);

        AuditoriaLog::registrar('CREAR', 'biblioteca_periodos', $periodo->id, "Creó el periodo fiscal {$periodo->anio}");

        return response()->json(['message' => 'Periodo creado', 'periodo' => $periodo], 201);
    }

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

        AuditoriaLog::registrar('CREAR', 'biblioteca_subcarpetas', $subcarpeta->id, "Creó la subcarpeta: {$subcarpeta->nombre}");

        return response()->json(['message' => 'Subcarpeta creada', 'subcarpeta' => $subcarpeta], 201);
    }

    public function uploadDocumento(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'subcarpeta_id' => 'required|exists:biblioteca_subcarpetas,id',
            'archivo' => 'required|file|mimes:pdf,xls,xlsx,doc,docx|max:15360', // Máx 15MB
            'observacion_cliente' => 'nullable|string'
        ]);

        if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $file = $request->file('archivo');
        $nombreOriginal = $file->getClientOriginalName();
        $extension = strtolower($file->getClientOriginalExtension());
        
        // Clasificar el icono para React
        $tipo = 'otro';
        if($extension == 'pdf') $tipo = 'pdf';
        elseif(in_array($extension, ['xls', 'xlsx'])) $tipo = 'excel';
        elseif(in_array($extension, ['doc', 'docx'])) $tipo = 'word';

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

   
    public function deleteDocumento($id)
    {
        $documento = Documento::find($id);
        if(!$documento) return response()->json(['message' => 'No encontrado'], 404);

        if(Storage::disk('public')->exists($documento->url_archivo)){
            Storage::disk('public')->delete($documento->url_archivo);
        }

        $nombre = $documento->nombre_archivo;
        $documento->delete();

        AuditoriaLog::registrar('ELIMINAR', 'documentos', $id, "Eliminó el archivo {$nombre}");

        return response()->json(['message' => 'Documento eliminado'], 200);
    }
}