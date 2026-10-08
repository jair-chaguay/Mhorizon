<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ImapController extends Controller
{
    public function getStatus(){
        $ajuste = DB::table('ajustes_sistema')->where('clave', 'agente_imap_activo')->first();
        $activo = $ajuste ? (bool)$ajuste->valor : false;

        return response()->json(['activo' => $activo]);
    }

    public function toggleStatus(){
        $ajuste = DB::table('ajustes_sistema')->where('clave', 'agente_imap_activo')->first();
        $nuevoEstado = $ajuste ? !$ajuste->valor : true;

        DB::table('ajustes_sistema')->updateOrInsert(
            ['clave'=>'agente_imap_activo'],
            [
                'valor'=>$nuevoEstado,
                'updated_at' => now()
            
            ]
        );
        return response()->json([
            'message' => $nuevoEstado ? 'Agente activado' : 'Agente pausado',
            'activo'  => $nuevoEstado
        ]);
    }
}