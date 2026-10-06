<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LeadController extends Controller
{
    public function index(){
        $leads = DB::table('leadss')
                    ->select('id', 'email', 'fase', 'envios_fase_actual', 'status', 'etiquetas', 'created_at', 'updated_at')
                    ->orderBy('id', 'desc')
                    ->get();
        return response()->json($leads);
    }

    public function uploadCsv(Request $request){
        $request->validate([
            'csv_file'=>'required|file|mimes:csv,txt',
            'etiquetas'=> 'nullable|string'
        ]);
        $etiquetasNuevas = [];
        if($request->etiquetas){
            $etiquetasNuevas = array_map('trim', explode(',', $request->etiquetas));
        }
        $path = $request->file('csv_file')->getRealPath();
        $fileContent = file($path);

        if (empty($fileContent)){
            return response()->json(['error'=>'El archivo CSV esta vacio'], 400);
        }
        $datos = array_map('str_getcsv',$fileContent);
        array_shift($datos);
        foreach ($datos as $fila){
            if (count($fila) < 1 || empty(trim($fila[0]))){
                continue;
            }
            $email = trim($fila[0]);
            $lead = DB::table('leadss')->where('email', $email)->first();

            if($lead){
                $etiquetasActuales = $lead->etiquetas ? json_decode($lead->etiquetas, true) : [];
                $etiquetasFinales = array_values(array_unique(array_merge($etiquetasActuales, $etiquetasNuevas)));
                DB::table('leadss')->where('email', $email)->update([
                    'etiquetas'=>json_encode($etiquetasFinales),
                    'updated_at'=>now()
                ]);
            }else{
                DB::table('leadss')->insert([
                    'email' => $email,
                    'fase'=> 1,
                    'status' =>'Pendiente',
                    'etiquetas'=>json_encode($etiquetasNuevas),
                    'created_at'=>now(),
                    'updated_at'=>now()
                ]);
            }
        }
        return response()->json(['message'=>'Base de datos cargada y sincronizada correctamente.']);
    }

    public function agregarEtiquetaManual(Request $request){
        $request->validate([
            'email' => 'required|email',
            'etiquetas'=> 'required|string'
        ]);

        $lead = DB::table('leadss')->where('email', $request->email)->first();
        if($lead){
            $etiquetasNuevas = array_map('trim', explode(',', $request->etiquetas));
            $etiquetasActuales = $lead->etiquetas ? json_decode($lead->etiquetas, true): [];

            $etiquetasFinales = array_values(array_unique(array_merge($etiquetasActuales, $etiquetasNuevas)));

            DB::table('leadss')->where('email',$request->email)->update([
                'etiquetas'=>json_encode($etiquetasFinales),
                'updated_at'=>now()
            ]);
            return response()->json(['message'=>'Etiqueta agregada correctamente']);
        }
        return response()->json(['error'=>'Prospecto no encontrado'], 404);
    }

    public function quitarEtiqueta(Request $request){
        $request->validate(['email'=>'required|email', 'etiqueta'=>'required|string']);
        $lead = DB::table('leadss')->where('email', $request->email)->first();

        if($lead && $lead->etiquetas){
            $etiquetasActuales = json_decode($lead->etiquetas, true);

            $etiquetasFinales = array_values(array_filter($etiquetasActuales, function($t) use ($request){
                return $t !== $request->etiqueta;
            }));

            DB::table('leadss')->where('email', $request->email)->update([
                'etiquetas'=>json_encode($etiquetasFinales),
                'updated_at'=>now()
            ]);
            return response()->json(['message'=>'Etiqueta eliminada']);
        }
        return response()->json(['error'=>'Prospecto no encontrado'], 404);
    }

    public function eliminarProspecto(Request $request){
        $request->validate([
            'email'=>'required|email'
        ]);

        $eliminado = DB::table('leadss')->where('email', $request->email)->delete();

        if($eliminado){
            return response()->json(['message'=>'Prospecto eliminado correctamente']);
        }

        return response()->json(['error'=>'Prospecto no encontrado'], 404);
    }
}