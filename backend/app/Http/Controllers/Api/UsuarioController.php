<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::with(['rol', 'empresa'])->get();

        return response()->json([
            'usuarios' => $usuarios,
            'status' => 200
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'rol_id' => 'required|exists:roles,id',
            'empresa_id' => 'nullable|exists:empresas,id',
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'correo' => 'required|email|max:150|unique:usuarios,correo',
            'password' => 'required|string|min:8',
            'cargo' => 'nullable|string|max:100'
        ]);

        if($validator->fails()){
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);
        }

        $usuario = Usuario::create([
            'rol_id' => $request->rol_id,
            'empresa_id' => $request->empresa_id,
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'correo' => $request->correo,
            'password_hash' => Hash::make($request->password), // Encriptamos la contraseña
            'cargo' => $request->cargo,
            'activo' => true
        ]);

        $usuario->load(['rol', 'empresa']);

        return response()->json([
            'message' => 'Usuario creado con éxito',
            'usuario' => $usuario,
            'status' => 201
        ], 201);
    }

    public function show($id)
    {
        $usuario = Usuario::with(['rol', 'empresa'])->find($id);

        if(!$usuario){
            return response()->json(['message' => 'Usuario no encontrado', 'status' => 404], 404);
        }

        return response()->json(['usuario' => $usuario, 'status' => 200], 200);
    }


    public function update(Request $request, $id)
    {
        $usuario = Usuario::find($id);

        if(!$usuario){
            return response()->json(['message' => 'Usuario no encontrado', 'status' => 404], 404);
        }

        $validator = Validator::make($request->all(), [
            'rol_id' => 'sometimes|required|exists:roles,id',
            'empresa_id' => 'nullable|exists:empresas,id',
            'nombre' => 'sometimes|required|string|max:100',
            'apellido' => 'sometimes|required|string|max:100',
            'correo' => 'sometimes|required|email|max:150|unique:usuarios,correo,'.$id,
            'password' => 'nullable|string|min:8', 
            'cargo' => 'nullable|string|max:100',
            'activo' => 'sometimes|required|boolean'
        ]);

        if($validator->fails()){
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);
        }

        $datosActualizar = $request->except(['password']);

        if($request->filled('password')){
            $datosActualizar['password_hash'] = Hash::make($request->password);
        }

        $usuario->update($datosActualizar);
        $usuario->load(['rol', 'empresa']);

        return response()->json([
            'message' => 'Usuario actualizado correctamente',
            'usuario' => $usuario,
            'status' => 200
        ], 200);
    }

    public function destroy($id)
    {
        $usuario = Usuario::find($id);

        if(!$usuario){
            return response()->json(['message' => 'Usuario no encontrado', 'status' => 404], 404);
        }

        $usuario->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente', 'status' => 200], 200);
    }
}