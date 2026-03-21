<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Validator;

class adminController extends Controller
{
    public function index()
    {
        $admins = Admin::all();
        //if($admins->isEmpty()){
        //    $data = [
        //       'message'=> 'No se encontraron usuarios registrados',
        //        'status' => 404
        //    ];
        //    return response()->json($data, 404);
        //}
        $data = [
            'admins' => $admins,
            'status'=> 200
        ];

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nick'=> 'required',
            'email'=> 'required|email',
            'password'=> 'required',
        ]);

        if($validator-> fails()){
            $data = [
                'message'=> 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }
        $admin = Admin::create([
            'nick'=> $request->nick,
            'email'=> $request->email,
            'password' => $request->password,
            'fecha_creacion'=>$request->fecha_creacion
        ]);

        if(!$admin){
            $data = [
                'message'=> 'Error al crear usuario',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'admin'=>$admin,
            'status'=>201
        ];

        return response()->json($data, 201);

    }
}
