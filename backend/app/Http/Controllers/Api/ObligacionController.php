<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ObligacionTributaria;
use Illuminate\Support\Facades\Validator;

class ObligacionController extends Controller
{

/**
     * Obtener las obligaciones de un cliente específico.
     */
    public function indexCliente($cliente_id)
    {
        $obligaciones = ObligacionTributaria::where('cliente_id', $cliente_id)->get();
        return response()->json([
            'obligaciones' => $obligaciones,
            'status' => 200
        ]);
    }
    /**
     * Almacenar una nueva obligación tributaria.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cliente_id'         => 'required|exists:clientes,id',
            'tipo_impuesto'      => 'required|in:Impuesto a la Renta,IVA (Mensual),IVA (Semestral),ICE,ISD,Activos Mantenidos en el Exterior,Anexo Transaccional (ATS)',
            'fecha_presentacion' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors'  => $validator->errors(),
                'status'  => 400
            ], 400);
        }

        $obligacion = ObligacionTributaria::create([
            'cliente_id'         => $request->cliente_id,
            'tipo_impuesto'      => $request->tipo_impuesto,
            'fecha_presentacion' => $request->fecha_presentacion,
            'estado'             => 'Pendiente' // Estado por defecto
        ]);

        return response()->json([
            'message'    => 'Obligación añadida con éxito',
            'obligacion' => $obligacion,
            'status'     => 201
        ], 201);
    }

    /**
     * Cambiar el estado de la obligación (Pendiente <-> Presentado).
     */
    public function toggleEstado($id)
    {
        $obligacion = ObligacionTributaria::find($id);

        if (!$obligacion) {
            return response()->json([
                'message' => 'Obligación no encontrada',
                'status'  => 404
            ], 404);
        }

        // Alternar el estado
        $obligacion->estado = $obligacion->estado === 'Pendiente' ? 'Presentado' : 'Pendiente';
        $obligacion->save();

        return response()->json([
            'message'    => 'Estado actualizado correctamente',
            'obligacion' => $obligacion,
            'status'     => 200
        ], 200);
    }

    /**
     * Eliminar una obligación tributaria.
     */
    public function destroy($id)
    {
        $obligacion = ObligacionTributaria::find($id);

        if (!$obligacion) {
            return response()->json([
                'message' => 'Obligación no encontrada',
                'status'  => 404
            ], 404);
        }

        $obligacion->delete();

        return response()->json([
            'message' => 'Obligación eliminada correctamente',
            'status'  => 200
        ], 200);
    }
}