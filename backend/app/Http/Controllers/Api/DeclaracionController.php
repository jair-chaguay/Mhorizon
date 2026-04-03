<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Declaracion;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class DeclaracionController extends Controller
{
    
    public function index(Request $request)
    {
        $query = Declaracion::with(['empresa', 'creador', 'modificador']);

        if ($request->has('empresa_id')) {
            $query->where('empresa_id', $request->empresa_id);
        }

        $declaraciones = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'declaraciones' => $declaraciones,
            'status' => 200
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'empresa_id' => 'required|exists:empresas,id',
            'periodo_fiscal' => 'required|string|max:50',
            'tipo_impuesto' => 'required|string|max:100',
            'estado' => 'required|in:Presentada y Pagada,Borrador,Pendiente de Pago',
            'fecha_presentacion' => 'nullable|date',
            'comprobante' => 'nullable|file|mimes:pdf,jpg,png|max:5120', // Máx 5MB
            'observacion_interna' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors(), 'status' => 400], 400);
        }

        $rutaComprobante = null;
        if ($request->hasFile('comprobante')) {
            $rutaComprobante = $request->file('comprobante')->store('declaraciones/comprobantes', 'public');
        }

        $declaracion = Declaracion::create([
            'empresa_id' => $request->empresa_id,
            'creado_por_id' => Auth::id(), // Colaborador logueado
            'periodo_fiscal' => $request->periodo_fiscal,
            'tipo_impuesto' => $request->tipo_impuesto,
            'estado' => $request->estado,
            'fecha_presentacion' => $request->fecha_presentacion,
            'comprobante_url' => $rutaComprobante,
            'observacion_interna' => $request->observacion_interna
        ]);

        $declaracion->load(['empresa', 'creador']);

        return response()->json(['message' => 'Declaración registrada', 'declaracion' => $declaracion, 'status' => 201], 201);
    }

    public function show($id)
    {
        $declaracion = Declaracion::with(['empresa', 'creador', 'modificador'])->find($id);
        
        if (!$declaracion) {
            return response()->json(['message' => 'No encontrado', 'status' => 404], 404);
        }
        
        return response()->json(['declaracion' => $declaracion, 'status' => 200], 200);
    }


    public function update(Request $request, $id)
    {
        $declaracion = Declaracion::find($id);
        
        if (!$declaracion) {
            return response()->json(['message' => 'No encontrado', 'status' => 404], 404);
        }

        $validator = Validator::make($request->all(), [
            'periodo_fiscal' => 'sometimes|required|string|max:50',
            'tipo_impuesto' => 'sometimes|required|string|max:100',
            'estado' => 'sometimes|required|in:Presentada y Pagada,Borrador,Pendiente de Pago',
            'fecha_presentacion' => 'nullable|date',
            'comprobante' => 'nullable|file|mimes:pdf,jpg,png|max:5120',
            'observacion_interna' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors(), 'status' => 400], 400);
        }

        if ($request->hasFile('comprobante')) {
            if ($declaracion->comprobante_url && Storage::disk('public')->exists($declaracion->comprobante_url)) {
                Storage::disk('public')->delete($declaracion->comprobante_url);
            }
            $declaracion->comprobante_url = $request->file('comprobante')->store('declaraciones/comprobantes', 'public');
        }

        $declaracion->fill($request->except('comprobante'));
        
        $declaracion->modificado_por_id = Auth::id();
        
        $declaracion->save();
        $declaracion->load(['empresa', 'modificador']);

        return response()->json(['message' => 'Declaración actualizada', 'declaracion' => $declaracion, 'status' => 200], 200);
    }

    public function destroy($id)
    {
        $declaracion = Declaracion::find($id);
        
        if (!$declaracion) {
            return response()->json(['message' => 'No encontrado', 'status' => 404], 404);
        }

        if ($declaracion->comprobante_url && Storage::disk('public')->exists($declaracion->comprobante_url)) {
            Storage::disk('public')->delete($declaracion->comprobante_url);
        }
        
        $declaracion->delete();
        
        return response()->json(['message' => 'Registro de declaración eliminado', 'status' => 200], 200);
    }
}