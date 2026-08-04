<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;

class ContactController extends Controller
{
    public function sendEmail(Request $request)
    {
        $validated = $request->validate([
            'nombre'   => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'email'    => 'required|email|max:150',
            'programa' => 'required|string|max:200',
            'mensaje'  => 'nullable|string|max:1000'
        ]);

        try {
            $destinatario = 'consultores@mhorizon.com.ec';

            Mail::to($destinatario)->send(new ContactFormMail($validated));

            return response()->json([
                'status' => 'success',
                'message' => 'Solicitud enviada correctamente.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error en el servidor al enviar el correo.',
                'error' => $e->getMessage() 
            ], 500);
        }
    }
}