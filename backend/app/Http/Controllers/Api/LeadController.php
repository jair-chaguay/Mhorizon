<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LeadController extends Controller
{
    public function index(){
        $leads = DB::table('leadss')->orderBy('id', 'desc')->get();
        return response()->json($leads);
    }
    public function uploadCsv(Request $request){
        $request->validate([
            'csv_file'=>'required|file|mimes:csv,txt'
        ]);
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
            DB::table('leadss')->updateOrInsert(
                ['email'=>$email],
                ['fase'=>1,
                'status'=>'Pendiente',
                'updated_at'=>now()]
            );

        }
        return response()->json(['message'=>'Base de datos cargada y sincronizada correctamente.']);
    }
}