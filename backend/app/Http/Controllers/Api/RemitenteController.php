<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Correos de remitente para Difusión manual
class RemitenteController extends Controller
{
    public function index()
    {
        if (!Schema::hasTable('remitentes')) {
            return response()->json([]);
        }
        // La contraseña SMTP nunca sale del servidor: solo se indica si la cuenta tiene datos propios
        $remitentes = DB::table('remitentes')
            ->orderByDesc('predeterminado')->orderBy('email')
            ->get(['id', 'email', 'nombre', 'smtp_host', 'predeterminado'])
            ->map(fn ($r) => [
                'id' => $r->id,
                'email' => $r->email,
                'nombre' => $r->nombre,
                'smtp_propio' => !empty($r->smtp_host),
                'predeterminado' => (bool) $r->predeterminado,
            ]);
        return response()->json($remitentes);
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'email' => 'required|email|max:255|unique:remitentes,email',
            'nombre' => 'required|string|max:120',
            'smtp_host' => 'nullable|string|max:255',
            'smtp_port' => 'nullable|integer|min:1|max:65535',
            'smtp_usuario' => 'nullable|string|max:255',
            'smtp_password' => 'nullable|string|max:255',
        ]);

        $hayRemitentes = DB::table('remitentes')->exists();
        $id = DB::table('remitentes')->insertGetId([
            'email' => mb_strtolower(trim($datos['email'])),
            'nombre' => trim($datos['nombre']),
            'smtp_host' => $datos['smtp_host'] ?? null,
            'smtp_port' => $datos['smtp_port'] ?? null,
            'smtp_usuario' => $datos['smtp_usuario'] ?? null,
            'smtp_password' => !empty($datos['smtp_password']) ? Crypt::encryptString($datos['smtp_password']) : null,
            'predeterminado' => !$hayRemitentes,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Remitente agregado', 'id' => $id], 201);
    }

    public function destroy($id)
    {
        $remitente = DB::table('remitentes')->where('id', $id)->first();
        if (!$remitente) {
            return response()->json(['message' => 'Remitente no encontrado'], 404);
        }
        if (DB::table('remitentes')->count() === 1) {
            return response()->json(['message' => 'Debe quedar al menos un remitente'], 422);
        }
        DB::table('remitentes')->where('id', $id)->delete();
        // Si era el predeterminado, pasa a serlo el primero que quede
        if ($remitente->predeterminado) {
            $primero = DB::table('remitentes')->orderBy('id')->value('id');
            DB::table('remitentes')->where('id', $primero)->update(['predeterminado' => true, 'updated_at' => now()]);
        }
        return response()->json(['message' => 'Remitente eliminado']);
    }
}
