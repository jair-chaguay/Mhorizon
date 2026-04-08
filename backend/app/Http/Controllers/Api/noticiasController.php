<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Noticias;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth; 

class noticiasController extends Controller
{
    /**Noticias para el carrusel */
    public function index()
    {
$noticias = Noticias::with('creador')->orderBy('created_at', 'desc')->get();

    return response()->json([
            'noticias' => $noticias,
            'status' => 200
        ], 200);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:150',
            'fuente' => 'required|string|max:100',
            'descripcion_corta' => 'required|string|max:255',
            'categoria' => 'required|in:Impuesto,Finanzas,Economía,Laboral,Societario',
            'url_destino' => 'required|url|max:500',
            'imagen' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $rutaImagen = $request->file('imagen')->store('noticias', 'public');

        

        $noticia = Noticias::create([
            'creado_por_id' => Auth::id(),
            'titulo' => $request->titulo,
            'fuente' => $request->fuente,
            'descripcion_corta' => $request->descripcion_corta,
            'categoria' => $request->categoria,
            'url_destino' => $request->url_destino,
            'imagen_url' => $rutaImagen
        ]);

        return response()->json([
            'message' => 'Noticia publicada con éxito',
            'noticia' => $noticia,
            'status' => 201
        ], 201);
    }


    public function show($id)
    {
        $noticia = Noticias::with('creador')->find($id);

        if (!$noticia) {
            return response()->json(['message' => 'Noticia no encontrada', 'status' => 404], 404);
        }

        return response()->json(['noticia' => $noticia, 'status' => 200], 200);
    }


    public function update(Request $request, $id)
    {
        $noticia = Noticias::find($id);

        if (!$noticia) {
            return response()->json(['message' => 'Noticia no encontrada', 'status' => 404], 404);
        }

        $validator = Validator::make($request->all(), [
            'titulo' => 'sometimes|required|string|max:150',
            'fuente' => 'sometimes|required|string|max:100',
            'descripcion_corta' => 'sometimes|required|string|max:255',
            'categoria' => 'sometimes|required|in:Impuesto,Finanzas,Economía,Laboral,Societario',
            'url_destino' => 'sometimes|required|url|max:500',
            'imagen' => 'sometimes|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);
        }

        if ($request->hasFile('imagen')) {
            if ($noticia->imagen_url && Storage::disk('public')->exists($noticia->imagen_url)) {
                Storage::disk('public')->delete($noticia->imagen_url);
            }
            $noticia->imagen_url = $request->file('imagen')->store('noticias', 'public');
        }

        $noticia->fill($request->except('imagen'));
        $noticia->save();

        return response()->json([
            'message' => 'Noticia actualizada',
            'noticia' => $noticia,
            'status' => 200
        ], 200);
    }

    public function destroy($id)
    {
        $noticia = Noticias::find($id);

        if (!$noticia) {
            return response()->json(['message' => 'Noticia no encontrada', 'status' => 404], 404);
        }

        // Eliminar el archivo físico de la imagen
        if ($noticia->imagen_url && Storage::disk('public')->exists($noticia->imagen_url)) {
            Storage::disk('public')->delete($noticia->imagen_url);
        }

        $noticia->delete();

        return response()->json(['message' => 'Noticia eliminada correctamente', 'status' => 200], 200);
    }
}
