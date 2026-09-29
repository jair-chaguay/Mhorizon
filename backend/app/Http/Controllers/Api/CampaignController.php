<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CampaignController extends Controller
{
    public function encolarEnvioManual(Request $request) {
        $request->validate([
            'asunto' => 'required|string',
            'cuerpo' => 'required|string',
            'fase'=> 'required|integer'
        ]);

        DB::table('tareas_envio')->insert([
            'tipo' =>'manual',
            'fase_objetivo' =>$request->fase,
            'asunto'=>$request->asunto,
            'cuerpo'=>$request->cuerpo,
            'estado'=>'pendiente',
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
        return response()->json(['message'=>'Campaña encolada para que Python la procese']);
    }

    public function lanzarCampanaIA(Request $request){
        DB::table('tareas_envio')->insert([
            'tipo' =>'ia_autonoma',
            'fase_objetivo'=>0,
            'asunto'=> 'Generación Automática',
            'cuerpo'=>'Generación Automática',
            'estado' => 'pendiente',
            'created_at' => now(),
            'updated_at' =>now()
        ]);
        return response()->json(['message'=>'Motor de IA activado y encolado']);
    }
    
}
