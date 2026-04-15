<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario; 
use Illuminate\Support\Facades\Mail;
use App\Mail\SendOtpMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PasswordResetController extends Controller
{
    public function sendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = Usuario::where('correo', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'No encontramos un usuario con ese correo.'], 404);
        }

        $codigo = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            ['token' => Hash::make($codigo), 'created_at' => Carbon::now()]
        );

        Mail::to($request->email)->send(new SendOtpMail($codigo));

        return response()->json(['message' => 'Código enviado con éxito.'], 200);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6'
        ]);

        $resetData = DB::table('password_reset_tokens')->where('email', $request->email)->first();

        if (!$resetData || !Hash::check($request->code, $resetData->token)) {
            return response()->json(['message' => 'Código inválido.'], 400);
        }

        if (Carbon::parse($resetData->created_at)->addMinutes(15)->isPast()) {
            return response()->json(['message' => 'El código ha expirado.'], 400);
        }

        $tempToken = Str::random(60);
        
        DB::table('password_reset_tokens')->where('email', $request->email)
            ->update(['token' => Hash::make($tempToken)]);

        return response()->json([
            'message' => 'Código verificado correctamente.',
            'token' => $tempToken 
        ], 200);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed' 
        ]);

        $resetData = DB::table('password_reset_tokens')->where('email', $request->email)->first();

        if (!$resetData || !Hash::check($request->token, $resetData->token)) {
            return response()->json(['message' => 'Token inválido o expirado.'], 400);
        }

        $user = Usuario::where('correo', $request->email)->first();
        $user->password_hash = Hash::make($request->password);
        $user->save();

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Contraseña actualizada con éxito.'], 200);
    }
}