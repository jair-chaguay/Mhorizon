<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cliente;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ClienteController extends Controller
{
    public function index()
    {
        // Traemos los clientes ordenados alfabéticamente junto con quién los creó
        $clientes = Cliente::with('creador')
                           ->orderBy('razon_social_nombres', 'asc')
                           ->get();

        return response()->json([
            'clientes' => $clientes,
            'status' => 200
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tipo_persona' => 'required|in:Natural,Jurídica',
            'razon_social_nombres' => 'required|string|max:255',
            'identificacion' => 'required|string|max:20|unique:clientes,identificacion',
            'direccion_matriz' => 'nullable|string',
            'score_tributario' => 'nullable|integer|min:0|max:100',
            'proximo_vencimiento' => 'nullable|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);
        }

        $cliente = Cliente::create([
            'tipo_persona' => $request->tipo_persona,
            'razon_social_nombres' => $request->razon_social_nombres,
            'identificacion' => $request->identificacion,
            'direccion_matriz' => $request->direccion_matriz,
            'score_tributario' => $request->score_tributario ?? 100,
            'proximo_vencimiento' => $request->proximo_vencimiento,
            'creado_por_id' => Auth::id() 
        ]);

        return response()->json(['message' => 'Cliente creado con éxito', 'cliente' => $cliente, 'status' => 201], 201);
    }

    public function show($id)
    {
        // Traemos al cliente con todos los usuarios (ej: el dueño y su contador)
        $cliente = Cliente::with(['usuarios', 'creador'])->find($id);

        if (!$cliente) return response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);

        return response()->json(['cliente' => $cliente, 'status' => 200], 200);
    }

    public function update(Request $request, $id)
    {
        $cliente = Cliente::find($id);
        if (!$cliente) return response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);

        $validator = Validator::make($request->all(), [
            'tipo_persona' => 'sometimes|required|in:Natural,Jurídica',
            'razon_social_nombres' => 'sometimes|required|string|max:255',
            'identificacion' => 'sometimes|required|string|max:20|unique:clientes,identificacion,'.$id,
            'direccion_matriz' => 'nullable|string',
            'score_tributario' => 'sometimes|required|integer|min:0|max:100',
            'proximo_vencimiento' => 'nullable|date'
        ]);

        if ($validator->fails()) return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);

        $cliente->update($request->all());

        return response()->json(['message' => 'Perfil del cliente actualizado', 'cliente' => $cliente, 'status' => 200], 200);
    }

    public function destroy($id)
    {
        $cliente = Cliente::find($id);
        if (!$cliente) return response()->json(['message' => 'Cliente no encontrado', 'status' => 404], 404);

        $cliente->delete();
        return response()->json(['message' => 'Cliente eliminado correctamente', 'status' => 200], 200);
    }
}