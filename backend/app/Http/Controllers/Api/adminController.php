<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;


class adminController extends Controller
{
    public function index()
    {
        $admins = Admin::all();
        $data = [
            'admins' => $admins,
            'status'=> 200
        ];

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nick'=> 'required|string|max:255',
            'email'=> 'required|email|unique:admin',
            'password'=> 'required|string|min:5',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=> 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $admin = Admin::create([
            'nick'=> $request->nick,
            'email'=> $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'admin'=>$admin,
            'status'=>201
        ], 201);
    }
 
    public function show($id)
    {
        $admin = Admin::find($id);

        if(!$admin){
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'admin' => $admin,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function destroy($id)
    {
        $admin = Admin::find($id);

        if(!$admin){
            $data = [
                'message' => 'Usuario no encontrado',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $admin->delete();

        $data = [
            'message'=> 'Usuario eliminado',
            'status'=> 200
        ];

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $admin = Admin::find($id);
        if(!$admin){
            $data = [
                'message'=> 'Usuario no encontrado',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'nick'=> 'required|string|max:255',
            'email'=> 'required|email|unique:admin,email,'.$id,
            'password'=> 'nullable|string|min:5'
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $admin->nick = $request->nick;
        $admin->email = $request->email;
        if($request->filled('password')){
            $admin->password = Hash::make($request->password);
        }

        $admin->save();

        $data = [
            'message' => 'Usuario actualizado',
            'admin' => $admin,
            'status'=>200
        ];

        return response()->json($data, 200);
    }

    public function updatePartial(Request $request, $id)
    {
        $admin = Admin::find($id);
        if(!$admin){
            $data = [
                'message'=> 'Usuario no encontrado',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'nick'=> 'sometimes|string|max:255',
            'email'=> 'sometimes|email|unique:admin,email,'.$id,
            'password'=> 'sometimes|string|min:5'
        ]);


        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if($request->has('nick')){
            $admin->nick = $request->nick;
        }

        if($request->has('email')){
            $admin->email = $request->email;
        }

        if($request->has('password')){
            $admin->password = Hash::make($request->password);
        }

        $admin->save();

        $data = [
            'message' => 'Usuario actualizado',
            'admin' => $admin,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'nick' => 'required',
            'password' => 'required'
        ]);

        $admin = Admin::where('nick', $request->nick)->first();

        if (!$admin) {
            return response()->json([
                'message' => 'Usuario no encontrado'
            ], 404);
        }

        if (!Hash::check($request->password, $admin->password)) {
            return response()->json([
                'message' => 'Contraseña incorrecta'
            ], 401);
        }

        return response()->json([
            'message' => 'Login correcto',
            'admin' => $admin
        ], 200);
    }
}
