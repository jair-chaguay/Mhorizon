<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empresa;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class EmpresaController extends Controller
{
    public function index()
    {
        $empresas = Empresa::with('creador')
                            ->orderBy('razon_social', 'asc')
                            ->get();

        return response()->json([
            'empresas' => $empresas,
            'status' => 200
        ], 200);    
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'razon_social' => 'required|string|max:150',
            'ruc' => 'required|string|max:20|unique:empresas,ruc',
            'direccion_matriz' => 'nullable|string',
            'score_tributario' => 'nullable|integer|min:0|max:100',
            'proximo_vencimiento' => 'nullable|date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $empresa = Empresa::create([
            'razon_social' => $request->razon_social,
            'ruc' => $request->ruc,
            'direccion_matriz' => $request->direccion_matriz,
            'score_tributario' => $request->score_tributario ?? 100, // Por defecto 100 si no envían nada
            'proximo_vencimiento' => $request->proximo_vencimiento,
            'creado_por_id' => Auth::id() 
        ]);

        return response()->json([
            'message' => 'Empresa creada con éxito',
            'empresa' => $empresa,
            'status' => 201
        ], 201);
    }

 
    public function show(string $id)
    {
        $empresa = Empresa::with(['usuarios', 'creador'])->find($id);

        if (!$empresa) {
            return response()->json(['message' => 'Empresa no encontrada', 'status' => 404], 404);
        }

        return response()->json(['empresa' => $empresa, 'status' => 200], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $empresa = Empresa::find($id);

        if (!$empresa) {
            return response()->json(['message' => 'Empresa no encontrada', 'status' => 404], 404);
        }

        $validator = Validator::make($request->all(), [
            'razon_social' => 'sometimes|required|string|max:150',
            // Validamos que el RUC sea único, EXCEPTO para el ID de esta misma empresa
            'ruc' => 'sometimes|required|string|max:20|unique:empresas,ruc,'.$id,
            'direccion_matriz' => 'nullable|string',
            'score_tributario' => 'sometimes|required|integer|min:0|max:100',
            'proximo_vencimiento' => 'nullable|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);
        }

        $empresa->update($request->all());

        return response()->json([
            'message' => 'Perfil de la empresa actualizado',
            'empresa' => $empresa,
            'status' => 200
        ], 200);
    }

    public function destroy(string $id)
    {
        $empresa = Empresa::find($id);

        if (!$empresa) {
            return response()->json(['message' => 'Empresa no encontrada', 'status' => 404], 404);
        }

        $empresa->delete();

        return response()->json(['message' => 'Empresa y todos sus datos relacionados eliminados correctamente', 'status' => 200], 200);
    }
}
