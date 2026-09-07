<?php

namespace App\Http\Controllers;

use App\Models\CorreoInformativo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CorreoInformativoController extends Controller
{
    public function index()
    {
        $correosInformativos = CorreoInformativo::all();
        
        return response()->json([
            'data' => $correosInformativos,
            'status' => 200
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            // ATENCIÓN: En 'unique' debes poner el nombre de la TABLA en la base de datos, no el Modelo.
            // Por defecto en Laravel sería 'correo_informativos'. Cámbialo si tu tabla se llama distinto.
            'email' => 'required|email|unique:correo_informativos,email', 
            
            // CORRECCIÓN: '100' no es una regla válida, debe ser 'max:100'
            'nombres' => 'nullable|string|max:100', 
            
            'source' => 'nullable|string|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $correoInformativo = CorreoInformativo::create([
            'email' => $request->email,
            'nombres' => $request->nombres,
            'source' => $request->source
        ]);

        // CORRECCIÓN: Tenías la llave 'status' duplicada ('success' y 201)
        return response()->json([
            'status' => 'success',
            'code' => 201, // Cambiado para evitar duplicar la llave
            'message' => 'Correo registrado exitosamente',
            'data' => $correoInformativo // Opcional: devolver el registro creado
        ], 201);
    }
}