<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Informativos;
use Illuminate\Support\Facades\Validator;

class informativosController extends Controller
{
    public function index()
    {
        $informativos = Informativos::all();
        $data = [
            'informativos' => $informativos,
            'status'=> 200
        ];

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo'=> 'required|string|max:255',
            'descripcion'=> 'required|string|max:255',
            'archivo' => 'required|file|mimes:jpg,png,pdf|max:2048'
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=> 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $ruta = $request->file('archivo')->store('informativos', 'public');

        $informativos = Informativos::create([
            'titulo'=> $request->titulo,
            'descripcion'=> $request->descripcion,
            'archivo' => $ruta
        ]);

        return response()->json([
            'informativos'=>$informativos,
            'status'=>201
        ], 201);
    }
 
    public function show($id)
    {
        $informativos = Informativos::find($id);

        if(!$informativos){
            $data = [
                'message' => 'Informativo no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'informativos' => $informativos,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function destroy($id)
    {
        $informativos = Informativos::find($id);

        if(!$informativos){
            $data = [
                'message' => 'Informativo no encontrado',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $informativos->delete();

        $data = [
            'message'=> 'Informativo eliminado',
            'status'=> 200
        ];

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $informativos = Informativos::find($id);
        if(!$informativos){
            $data = [
                'message'=> 'Informativo no encontrado',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'titulo'=> 'required|string|max:255',
            'descripcion'=> 'required|string|max:255',
            'archivo' => 'sometimes|file|mimes:jpg,png,pdf|max:2048'
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if($request->hasFile('archivo')){
            // eliminar archivo anterior
            if($informativos->archivo){
                Storage::disk('public')->delete($informativos->archivo);
            }

            // guardar nuevo archivo
            $ruta = $request->file('archivo')->store('informativos', 'public');
            $informativos->archivo = $ruta;
        }


        $informativos->titulo = $request->titulo;
        $informativos->descripcion = $request->descripcion;

        $informativos->save();

        $data = [
            'message' => 'Informativo actualizado',
            'informativos' => $informativos,
            'status'=>200
        ];

        return response()->json($data, 200);
    }

    public function updatePartial(Request $request, $id)
    {
        $informativos = Informativos::find($id);
        if(!$informativos){
            $data = [
                'message'=> 'Informativo no encontrado',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'titulo'=> 'sometimes|string|max:255',
            'descripcion'=> 'sometimes|string|max:255',
            'archivo' => 'sometimes|file|mimes:jpg,png,pdf|max:2048'
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if($request->has('titulo')){
            $informativos->titulo = $request->titulo;
        }

        if($request->has('descripcion')){
            $informativos->descripcion = $request->descripcion;
        }

        if($request->hasFile('archivo')){
            if($informativos->archivo){
                Storage::disk('public')->delete($informativos->archivo);
            }

            $ruta = $request->file('archivo')->store('informativos', 'public');
            $informativos->archivo = $ruta;
        }

        $informativos->save();

        $data = [
            'message' => 'Informativo actualizado',
            'informativos' => $informativos,
            'status' => 200
        ];

        return response()->json($data, 200);
    }
}
