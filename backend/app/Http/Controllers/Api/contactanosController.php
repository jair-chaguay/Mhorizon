<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\Contactanos;


class contactanosController extends Controller
{
    public function index()
    {
        $contactos = Contactanos::all();
        $data = [
            'contactos' => $contactos,
            'status'=> 200
        ];

        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'=> 'required|string|max:255',
            'email'=> 'required|email|unique:admin',
            'asunto'=> 'required|string|max:255',
            'mensaje'=> 'required|text',
            'estado'=> 'required|in:pendiente,atendido'
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=> 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $contactanos = Contactanos::create([
            'name'=> $request->name,
            'email'=> $request->email,
            'asunto'=> $request->asunto,
            'mensaje'=>$request->mensaje,
            estado=>$request->estado
        ]);

        return response()->json([
            'contactanos'=>$admin,
            'status'=>201
        ], 201);
    }

    public function show($id)
    {
        $contactanos = Contactanos::find($id);

        if(!$contactanos){
            $data = [
                'message' => 'Mensaje no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'contactanos' => $contactanos,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function destroy($id)
    {
        $contactanos = Contactanos::find($id);

        if(!$contactanos){
            $data = [
                'message' => 'Usuario no encontrado',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $contactanos->delete();

        $data = [
            'message'=> 'Usuario eliminado',
            'status'=> 200
        ];

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $contactanos = Suscriptores::find($id);
        if(!$contactanos){
            $data = [
                'message'=> 'Mensaje no encontrado',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name'=> 'required|string|max:255',
            'email' => 'required|email|unique:contactanos,email,'.$id,
            'asunto'=> 'required|string|max:255',
            'mensaje'=> 'required|text',
            'estado'=> 'required|in:pendiente,atendido'
        ]);

        if($validator->fails()){
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $contactanos->name = $request->name;
        $contactanos->email = $request->email;
        $contactanos->asunto = $request->asunto;
        $contactanos->mensaje = $request->mensaje;
        $contactanos->estado = $request->estado;
        

        $contactanos->save();

        $data = [
            'message' => 'Mensaje actualizado',
            'contactanos' => $contactanos,
            'status'=>200
        ];

        return response()->json($data, 200);
    }

        public function updatePartial(Request $request, $id)
    {
        $contactanos = Suscriptores::find($id);
        if(!$contactanos){
            $data = [
                'message'=> 'Mensaje no encontrado',
                'status'=> 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'name'=> 'sometimes|string|max:255',
            'email'=> 'sometimes|email'.$id,
            'asunto'=> 'sometimes|string|max:255',
            'mensaje'=> 'sometimes|text',
            'estado'=> 'sometimes|in:pendiente,atendido'
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
            $contactanos->name = $request->name;
        }

        if($request->has('email')){
            $contactanos->email = $request->email;
        }

        if($request->has('asunto')){
            $contactanos->asunto = $request->asunto;
        }

        if($request->has('mensaje')){
            $contactanos->mensaje = $request->mensaje;
        }

        if($request->has('estado')){
            $contactanos->estado = $request->estado;
        }


        $contactanos->save();

        $data = [
            'message' => 'Mensaje actualizado',
            'contactanos' => $contactanos,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

}
