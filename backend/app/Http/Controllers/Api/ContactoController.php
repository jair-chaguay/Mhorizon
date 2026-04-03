<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MensajeContacto;
use App\Models\AuditoriaLog;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ContactoController extends Controller
{

    public function index()
    {
        $mensajes = MensajeContacto::with('leidoPor')
                                    ->orderBy('leido', 'asc')
                                    ->orderBy('created_at', 'desc')
                                    ->get();

        return response()->json([
            'mensajes' => $mensajes,
            'status' => 200
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'correo' => 'required|email|max:150',
            'mensaje' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json(['errors' => $validator->errors(), 'status' => 400], 400);
        }

        $mensaje = MensajeContacto::create($request->all());

        return response()->json([
            'message' => 'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto pronto.',
            'status' => 201
        ], 201);
    }


    public function show($id)
    {
        $mensaje = MensajeContacto::with('leidoPor')->find($id);

        if(!$mensaje){
            return response()->json(['message' => 'Mensaje no encontrado', 'status' => 404], 404);
        }

        return response()->json(['mensaje' => $mensaje, 'status' => 200], 200);
    }

  
    public function marcarComoLeido($id)
    {
        $mensaje = MensajeContacto::find($id);

        if(!$mensaje){
            return response()->json(['message' => 'Mensaje no encontrado', 'status' => 404], 404);
        }

        // Si ya estaba leído, no hacemos nada
        if($mensaje->leido) {
            return response()->json(['message' => 'El mensaje ya había sido marcado como leído', 'status' => 200], 200);
        }

        $mensaje->update([
            'leido' => true,
            'leido_por_id' => Auth::id() // Registramos al colaborador que se hizo cargo
        ]);

        // Dejamos rastro en la auditoría
        AuditoriaLog::registrar(
            'EDITAR', 
            'mensajes_contacto', 
            $mensaje->id, 
            "Marcó como leído el mensaje de {$mensaje->nombre} {$mensaje->apellido}"
        );

        return response()->json([
            'message' => 'Mensaje marcado como atendido',
            'mensaje' => $mensaje,
            'status' => 200
        ], 200);
    }


    public function destroy($id)
    {
        $mensaje = MensajeContacto::find($id);

        if(!$mensaje){
            return response()->json(['message' => 'Mensaje no encontrado', 'status' => 404], 404);
        }

        $remitente = "{$mensaje->nombre} {$mensaje->apellido}";
        $mensaje->delete();

        AuditoriaLog::registrar('ELIMINAR', 'mensajes_contacto', $id, "Eliminó el mensaje de contacto de {$remitente}");

        return response()->json(['message' => 'Mensaje eliminado de la bandeja', 'status' => 200], 200);
    }
}