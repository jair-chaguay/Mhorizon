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
            'categoria' => 'required|string|max:100',
            'titulo' => 'required|string|max:255',
            'resolucion_oficial' => 'nullable|string|max:100',
            'contenido' => 'required|string',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors(), 'status' => 400], 400);
        }

        $rutaImagen = null;
        if($request->hasFile('imagen')){
            $rutaImagen = $request->file('imagen')->store('informativos', 'public');
        }

        $informativo = Informativo::create([
            'creado_por_id' => Auth::id(), // ID del Admin/Colab logueado
            'categoria' => $request->categoria,
            'titulo' => $request->titulo,
            'resolucion_oficial' => $request->resolucion_oficial,
            'contenido' => $request->contenido,
            'imagen_portada_url' => $rutaImagen
        ]);

        return response()->json(['message' => 'Informativo publicado', 'informativo' => $informativo], 201);
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
            'categoria' => 'sometimes|required|string',
            'titulo' => 'sometimes|required|string',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        if($validator->fails()) return response()->json($validator->errors(), 400);

        if($request->hasFile('imagen')){
            // Borrar imagen anterior
            if($informativo->imagen_portada_url) Storage::disk('public')->delete($informativo->imagen_portada_url);
            $informativo->imagen_portada_url = $request->file('imagen')->store('informativos', 'public');
        }

        $informativo->fill($request->except('imagen'));
        
        $informativo->modificado_por_id = Auth::id(); 
        
        $informativo->save();

        return response()->json(['message' => 'Informativo actualizado', 'informativo' => $informativo], 200);
    }


    public function destroy(string $id)
    {
        $informativo = Informativo::find($id);
        if(!$informativo) return response()->json(['message' => 'No encontrado'], 404);

        if($informativo->imagen_portada_url) Storage::disk('public')->delete($informativo->imagen_portada_url);
        
        $informativo->delete();
        return response()->json(['message' => 'Informativo eliminado'], 200);
    }
}
