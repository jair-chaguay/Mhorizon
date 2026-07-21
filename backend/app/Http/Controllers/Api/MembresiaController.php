<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\NotificacionMembresia;

class MembresiaController extends Controller
{
    public function solicitar(Request $request)
    {
        $validated = $request->validate([
            'nombre'   => 'required|string|max:255',
            'empresa'  => 'required|string|max:255',
            'correo'   => 'required|email|max:255',
            'telefono' => 'required|string|max:50',
            'ciudad'   => 'required|string',
            'perfil'   => 'required|string',
            'mensaje'  => 'nullable|string'
        ]);

        Mail::to('jairchaguay@gmail.com')->send(new NotificacionMembresia($validated));

        return response()->json([
            'success' => true,
            'message' => 'Solicitud enviada correctamente.'
        ]);
    }
}