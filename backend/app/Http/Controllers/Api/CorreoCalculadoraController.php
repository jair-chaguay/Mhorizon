<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CorreoCalculadora;
use Illuminate\Support\Facades\Validator;


class CorreoCalculadoraController extends Controller
{
    public function index ()
    {
        $correoC = CorreoCalculadora::all();
        return response()->json([
            'correoC' => $correoC,
            'status' => 200
        ], 200);
    }

    public function store (Request $request){
        $validator = Validator::make($request->all(), [
            'correo'=> 'required|email|max:100',
            'tipo_contribuyente' => 'required|in:Natural, Jurídica',
            'regimen'=>'required|boolean'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);
        }

        $correoC = CorreoCalculadora::create([
            'correo'=> $request->correo,
            'tipo_contribuyente' => $request -> tipo_contribuyente,
            'regimen' => $request->regimen
        ]);

        return response()->json([
            'message' => 'Correo enviado con éxito',
            'correoC' => $correoC,
            'status' => 201
        ], 201);
    }

    public function show($id){
        $correoC = CorreoCalculadora::find($id);
        if (!$correoC) {
            return response()->json(['message' => 'Correo no encontrado', 'status' => 404], 404);
        }

        return response()->json(['correoC' => $correoC, 'status' => 200], 200);
    }

    public function destroy ($id){
        $correoC = CorreoCalculadora::find($id);
        
        if (!$correoC) {
            return response()->json(['message' => 'Correo no encontrado', 'status' => 404], 404);
        }

        $correoC->delete();

        return response()->json(['message' => 'Correo eliminado correctamente', 'status' => 200], 200);
    }
}
