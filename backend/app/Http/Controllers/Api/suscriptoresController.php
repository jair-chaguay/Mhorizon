<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Suscriptores;
use Illuminate\Support\Facades\Validator;


class suscriptoresController extends Controller
{
    public function index()
    {
        $suscriptores = Suscriptores::all();
        $data = [
            'suscriptores' => $suscriptores,
            'status'=> 200
        ];

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'=> 'required|string|max:255',
            'email'=> 'required|email',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=> 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $suscriptores = Suscriptores::create([
            'name'=> $request->name,
            'email'=> $request->email,
        ]);

        return response()->json([
            'suscriptores'=>$suscriptores,
            'status'=>201
        ], 201);
    }
 
    public function show($id)
    {
        $suscriptores = Suscriptores::find($id);

        if(!$suscriptores){
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'suscriptores' => $suscriptores,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function destroy($id)
    {
        $suscriptores = Suscriptores::find($id);

        if(!$suscriptores){
            $data = [
                'message' => 'Usuario no encontrado',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $suscriptores->delete();

        $data = [
            'message'=> 'Usuario eliminado',
            'status'=> 200
        ];

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $suscriptores = Suscriptores::find($id);
        if(!$suscriptores){
            $data = [
                'message'=> 'Usuario no encontrado',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name'=> 'required|string|max:255',
            'email' => 'required|email|unique:suscriptores,email,'.$id
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $suscriptores->name = $request->name;
        $suscriptores->email = $request->email;

        $suscriptores->save();

        $data = [
            'message' => 'Usuario actualizado',
            'suscriptores' => $suscriptores,
            'status'=>200
        ];

        return response()->json($data, 200);
    }

    public function updatePartial(Request $request, $id)
    {
        $suscriptores = Suscriptores::find($id);
        if(!$suscriptores){
            $data = [
                'message'=> 'Usuario no encontrado',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name'=> 'sometimes|string|max:255',
            'email'=> 'sometimes|email'.$id,
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if($request->has('name')){
            $suscriptores->name = $request->name;
        }

        if($request->has('email')){
            $suscriptores->email = $request->email;
        }


        $suscriptores->save();

        $data = [
            'message' => 'Usuario actualizado',
            'suscriptores' => $suscriptores,
            'status' => 200
        ];

        return response()->json($data, 200);
    }
}
