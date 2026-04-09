<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cliente;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB; // Añadir esto
use Illuminate\Support\Facades\Hash; // Añadir esto
use App\Models\Usuario; // Añadir esto

class ClienteController extends Controller
{
    public function index()
    {
        // Traemos los clientes ordenados alfabéticamente junto con quién los creó
        $clientes = Cliente::with('creador', 'usuarios')
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
            // Datos del Cliente
            'tipo_persona' => 'required|in:Régimen General,Rimpe,Contribuyente Especial,Persona Natural',
            'razon_social_nombres' => 'required|string|max:255',
            'identificacion' => 'required|string|max:20|unique:clientes,identificacion',
            'score_tributario' => 'required|integer|min:0|max:100',
            
            // Datos del Usuario de acceso
            'correo' => 'required|email|max:150|unique:usuarios,correo',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);
        }

        // 2. Usamos DB Transaction para que si algo falla, no se guarde nada a medias
        DB::beginTransaction();

        try {
            // A. Crear el Cliente
            $cliente = Cliente::create([
                'tipo_persona' => $request->tipo_persona,
                'razon_social_nombres' => $request->razon_social_nombres,
                'identificacion' => $request->identificacion,
                'score_tributario' => $request->score_tributario,
                'creado_por_id' => Auth::id() // El admin que lo está creando
            ]);

            // B. Crear el Usuario asociado a ese Cliente
            $usuario = Usuario::create([
                'rol_id' => 2, // ASUMIENDO QUE EL ROL 2 ES "CLIENTE". Cambia esto si tu ID es diferente.
                'cliente_id' => $cliente->id, // Conectamos el usuario al cliente recién creado
                'nombre' => 'Representante', // Puedes pedir esto en el form si quieres
                'apellido' => 'Cliente',     // Puedes pedir esto en el form si quieres
                'correo' => $request->correo,
                'password_hash' => Hash::make($request->password),
                'activo' => true
            ]);

            DB::commit(); // Confirmar guardado

            return response()->json([
                'message' => 'Cliente y Usuario creados con éxito', 
                'cliente' => $cliente, 
                'status' => 201
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack(); // Revertir todo si hay un error en BDD
            return response()->json([
                'message' => 'Error interno al crear el cliente', 
                'error' => $e->getMessage(),
                'status' => 500
            ], 500);
        }
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
            'tipo_persona' => 'sometimes|required|in:Régimen General,Rimpe,Contribuyente Especial,Persona Natural',
            'razon_social_nombres' => 'sometimes|required|string|max:255',
            'identificacion' => 'sometimes|required|string|max:20|unique:clientes,identificacion,'.$id,
            'direccion_matriz' => 'nullable|string',
            'score_tributario' => 'sometimes|required|integer|min:0|max:100',
            // Añadimos validaciones para los datos del usuario:
            'correo' => 'sometimes|required|email|max:150',
            'password' => 'nullable|string|min:8',
            'representante' => 'nullable|string|max:200'
        ]);

        if ($validator->fails()) return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);

        // A. Actualizamos el Cliente (Dirección, RUC, etc)
        $cliente->update($request->only(['tipo_persona', 'razon_social_nombres', 'identificacion', 'direccion_matriz', 'score_tributario']));

        // B. Buscamos el usuario principal asociado a este cliente y lo actualizamos
        $usuario = \App\Models\Usuario::where('cliente_id', $cliente->id)->first();
        if ($usuario) {
            if ($request->filled('correo')) {
                $usuario->correo = $request->correo;
            }
            if ($request->filled('password')) {
                $usuario->password_hash = Hash::make($request->password);
            }
            if ($request->filled('representante')) {
                // Dividimos el string en Nombre y Apellido
                $partes = explode(' ', $request->representante, 2);
                $usuario->nombre = $partes[0];
                $usuario->apellido = $partes[1] ?? ''; 
            }
            $usuario->save();
        }

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