<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Informativo;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;


class InformativoController extends Controller
{

    public function index()
    {
        $informativos = Informativo::with(['creador', 'modificador'])
                                    ->orderBy('created_at', 'desc')
                                    ->get();

        return response()->json([
            'informativos' => $informativos,
            'status' => 200
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'descripcion_portada' => 'required|string',
            'contenido' => 'required|string',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'archivo_pdf' => 'nullable|mimes:pdf|max:10000' // Validación para PDF
        ]);

        if($validator->fails()) return response()->json(['errors' => $validator->errors()], 400);

        $rutaImagen = $request->hasFile('imagen') 
            ? $request->file('imagen')->store('informativos/portadas', 'public') 
            : null;

        $rutaPdf = $request->hasFile('archivo_pdf') 
            ? $request->file('archivo_pdf')->store('informativos/documentos', 'public') 
            : null;

        $informativo = Informativo::create([
            'creado_por_id' => Auth::id(),
            'titulo' => $request->titulo,
            'descripcion_portada' => $request->descripcion_portada,
            'resolucion_oficial' => $request->resolucion_oficial,
            'contenido' => $request->contenido,
            'imagen_portada_url' => $rutaImagen,
            'pdf_url' => $rutaPdf
        ]);

        return response()->json(['message' => 'Creado con éxito', 'informativo' => $informativo], 201);
    }


    public function show(string $id)
    {
        $informativo = Informativo::with(['creador', 'modificador'])->find($id);
        if(!$informativo) return response()->json(['message' => 'No encontrado'], 404);
        return response()->json($informativo, 200);
    }

    public function update(Request $request, string $id)
    {
        $informativo = Informativo::find($id);
        if(!$informativo) return response()->json(['message' => 'No encontrado'], 404);

        $validator = Validator::make($request->all(), [
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'archivo_pdf' => 'nullable|mimes:pdf|max:10000'
        ]);

        if($validator->fails()) return response()->json($validator->errors(), 400);

        // Lógica para la Imagen
        if($request->hasFile('imagen')){
            if($informativo->imagen_portada_url) Storage::disk('public')->delete($informativo->imagen_portada_url);
            $informativo->imagen_portada_url = $request->file('imagen')->store('informativos/portadas', 'public');
        }

        // Lógica para el PDF
        if($request->hasFile('archivo_pdf')){
            if($informativo->pdf_url) Storage::disk('public')->delete($informativo->pdf_url);
            $informativo->pdf_url = $request->file('archivo_pdf')->store('informativos/documentos', 'public');
        }

        $informativo->fill($request->except(['imagen', 'archivo_pdf']));
        $informativo->modificado_por_id = Auth::id(); 
        $informativo->save();

        return response()->json(['message' => 'Actualizado', 'informativo' => $informativo], 200);
    }


    public function uploadEditorImage(Request $request)
    {
        $request->validate([
            'imagen_editor' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('imagen_editor')) {
            $path = $request->file('imagen_editor')->store('informativos/editor', 'public');
            
            return response()->json([
                'url' => Storage::url($path)
            ], 200);
        }

        return response()->json(['error' => 'No se recibió ninguna imagen'], 400);
    }


    public function destroy(string $id)
    {
        $informativo = Informativo::find($id);
        if(!$informativo) return response()->json(['message' => 'No encontrado'], 404);

        if($informativo->imagen_portada_url) Storage::disk('public')->delete($informativo->imagen_portada_url);
        if($informativo->pdf_url) Storage::disk('public')->delete($informativo->pdf_url);
        
        $informativo->delete();
        return response()->json(['message' => 'Eliminado'], 200);
    }
}
