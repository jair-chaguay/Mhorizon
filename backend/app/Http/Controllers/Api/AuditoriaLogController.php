<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AuditoriaLog;

class AuditoriaLogController extends Controller
{
    /**
     * Listar la bitácora de auditoría (Solo para Administradores)
     */
    public function index(Request $request)
    {
        // Por seguridad, aquí deberías verificar que el Auth::user() tenga rol de Admin.
        // Si es un simple colaborador, le puedes devolver un 403 Forbidden.

        $query = AuditoriaLog::with('usuario');

        // Filtro opcional por si React quiere ver solo las acciones de un usuario específico
        if ($request->has('usuario_id')) {
            $query->where('usuario_id', $request->usuario_id);
        }

        // Filtro opcional por tabla (Ej: ver solo auditoría de "documentos")
        if ($request->has('tabla')) {
            $query->where('tabla_afectada', $request->tabla);
        }

        // Usamos paginación en lugar de get() para no saturar la red (50 registros por página)
        $logs = $query->orderBy('created_at', 'desc')->paginate(50);

        return response()->json([
            'auditoria' => $logs,
            'status' => 200
        ], 200);
    }

    public function show($id)
    {
        $log = AuditoriaLog::with('usuario')->find($id);

        if (!$log) {
            return response()->json(['message' => 'Registro no encontrado', 'status' => 404], 404);
        }

        return response()->json(['auditoria' => $log, 'status' => 200], 200);
    }
    
}