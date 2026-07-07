<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

/**
 * Controlador de Autenticación de la API.
 * * Gestiona el inicio y cierre de sesión de los usuarios, la emisión
 * de tokens de acceso (Sanctum) y el registro del último acceso.
 */
class AuthController extends Controller
{
    /**
     * Autentica a un usuario y genera un token de acceso.
     *
     * Valida las credenciales ingresadas, verifica que el usuario esté activo
     * en el sistema, actualiza su fecha de último acceso y devuelve un token 
     * para consumir endpoints protegidos.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usuario' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Datos inválidos', 'errors' => $validator->errors(), 'status' => 400], 400);
        }

        $login = $request->usuario;

        //Busca al usuario junto con sus relaciones (rol y cliente)
        $usuario = Usuario::with(['rol', 'cliente'])
            ->where(function ($query) use ($login) {
                $query->whereHas('cliente', function ($q) use ($login){
                    $q->where('identificacion', $login);
                });
            })
            ->orWhere(function($query) use ($login){
                $query->whereNull('cliente_id')
                        ->where(function($subQuery) use ($login){
                            $subQuery->where('correo', $login)
                                        ->orWhere('correo_personal', $login);
                        });
            })
            ->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password_hash)) {
            return response()->json(['message' => 'Credenciales incorrectas.', 'status' => 401], 401);
        }

        if (!$usuario->activo) {
            return response()->json(['message' => 'Esta cuenta ha sido desactivada. Contacte al administrador.', 'status' => 403], 403);
        }

        $usuario->ultimo_acceso = Carbon::now();
        $usuario->save();

        //Generar Token de acceso (Laravel Sanctum)
        $token = $usuario->createToken('MHorizonApp')->plainTextToken;

        return response()->json([
            'message' => 'Bienvenido a MHorizon',
            'token' => $token,
            'usuario' => $usuario, 
            'status' => 200
        ], 200);
    }


    /**
     * Cierra la sesión del usuario actual.
     *
     * Revoca el token de acceso que se utilizó para realizar la petición,
     * invalidándolo para futuras consultas.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Elimina el token actual que autorizó esta solicitud
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada correctamente', 'status' => 200], 200);
    }
}