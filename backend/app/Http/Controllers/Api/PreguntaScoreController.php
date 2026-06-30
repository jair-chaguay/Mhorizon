<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PreguntaScore;

class PreguntaScoreController extends Controller
{
    public function obtenerPreguntas(){
        $preguntas = PreguntaScore::where('activa', true)
                                ->inRandomOrder()
                                ->limit(5)
                                ->get();
        return response()->json([
            'preguntas'=>$preguntas,
            'status'=> 200
        ], 200);
    }
    
}
