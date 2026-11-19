<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

// Deja pasar solo a los roles indicados en la ruta, por ejemplo ->middleware('rol:1,3').
// Roles: 1 colaborador, 2 cliente, 3 administrador. Va después de auth:sanctum
class VerificarRol
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $rol = (int) optional($request->user())->rol_id;
        if (!in_array($rol, array_map('intval', $roles), true)) {
            return response()->json(['message' => 'No tienes permiso para esta acción', 'status' => 403], 403);
        }
        return $next($request);
    }
}
