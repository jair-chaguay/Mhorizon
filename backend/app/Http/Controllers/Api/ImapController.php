<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ImapController extends Controller
{
    public function getStatus(){
        $config = DB::table('configuraciones')->where('clave', 'agente_imap_activo')->first();
        $isActive = $config ? (bool)$config->valor : false;

        return response()->json(['is_active' => $isActive]);
    }

    public function toggleStatus(){
        $config = DB::table('configuraciones')->where('clave', 'agente_imap_activo')->first();
        $nuevoEstado = $config ? !$config->valor : true;

        DB::table('configuraciones')->updateOrInsert(
            ['clave'=>'agente_imap_activo'],
            [
                'valor'=>$nuevoEstado,
                'updated_at' => now()
            
            ]
        );
        return response()->json([
            'is_active'=>(bool)$nuevoEstado,
            'message' => 'Estado del agente IMAP actualizado correctamente'
        ]);
    }
}