<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'correo' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Datos inválidos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $usuario = Usuario::with(['rol', 'empresa'])->where('correo', $request->correo)->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password_hash)) {
            return response()->json([
                'message' => 'Credenciales incorrectas.',
                'status' => 401 // No autorizado
            ], 401);
        }

        if (!$usuario->activo) {
            return response()->json([
                'message' => 'Esta cuenta ha sido desactivada. Contacte al administrador.',
                'status' => 403 // Prohibido
            ], 403);
        }

        $usuario->ultimo_acceso = Carbon::now();
        $usuario->save();

        $token = $usuario->createToken('MHorizonApp')->plainTextToken;

        return response()->json([
            'message' => 'Bienvenido a MHorizon',
            'token' => $token,
            'usuario' => $usuario, // Trae el rol y la empresa gracias al 'with'
            'status' => 200
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente',
            'status' => 200
        ], 200);
    }
}



