<?php

namespace App\Http\Controllers\Api;

use App\Models\CorreoInformativo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\NuevoCorreoInformativoMail;

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
            'email' => 'required|email|unique:correo_informativos,email', 
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

        try {
            Mail::to('consultores@mhorizon.com.ec')->send(new NuevoCorreoInformativoMail($correoInformativo));
        } catch (\Exception $e) {
        }

        return response()->json([
            'status' => 'success',
            'code' => 201, 
            'message' => 'Correo registrado exitosamente',
            'data' => $correoInformativo 
        ], 201);
    }
}