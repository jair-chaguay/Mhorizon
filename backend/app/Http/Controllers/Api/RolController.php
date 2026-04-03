<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rol;
use Illuminate\Support\Facades\Validator;

class RolController extends Controller
{

    public function index()
    {
        $roles = Rol::orderBy('nivel_acceso', 'desc')->get();

        return response()->json([
            'roles' => $roles,
            'status' => 200
        ], 200);

    }

  
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:50|unique:roles,nombre',
            'es_interno' => 'required|boolean',
            'nivel_acceso' => 'required|integer|min:1|max:100'
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $rol = Rol::create($request->all());

        return response()->json([
            'message' => 'Rol creado con éxito',
            'rol' => $rol,
            'status' => 201
        ], 201);
    }


    public function show(string $id)
    {
        $rol = Rol::find($id);

        if(!$rol){
            return response()->json(['message' => 'Rol no encontrado', 'status' => 404], 404);
        }

        return response()->json(['rol' => $rol, 'status' => 200], 200);
    }


    public function update(Request $request, string $id)
    {
        $rol = Rol::find($id);

        if(!$rol){
            return response()->json(['message' => 'Rol no encontrado', 'status' => 404], 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre' => 'sometimes|required|string|max:50|unique:roles,nombre,'.$id,
            'es_interno' => 'sometimes|required|boolean',
            'nivel_acceso' => 'sometimes|required|integer|min:1|max:100'
        ]);

        if($validator->fails()){
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);
        }

        $rol->update($request->all());

        return response()->json([
            'message' => 'Rol actualizado',
            'rol' => $rol,
            'status' => 200
        ], 200);
    }

  
    public function destroy(string $id)
    {
        $rol = Rol::find($id);

        if(!$rol){
            return response()->json(['message' => 'Rol no encontrado', 'status' => 404], 404);
        }

        // Verificamos si hay usuarios asignados a este rol antes de borrarlo
        // Esto es una capa extra de seguridad para evitar errores fatales.
        if($rol->usuarios()->count() > 0) {
            return response()->json([
                'message' => 'No puedes eliminar este rol porque tiene usuarios asignados.',
                'status' => 403 // Prohibido
            ], 403);
        }

        $rol->delete();

        return response()->json(['message' => 'Rol eliminado correctamente', 'status' => 200], 200);
    }
}