<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ObligacionTributaria;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\BibliotecaPeriodo;
use App\Models\BibliotecaSubcarpeta;
use Illuminate\Support\Facades\Auth;

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
     * Almacenar una nueva obligación tributaria y sincronizar carpetas.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required|exists:clientes,id',
            'tipo_impuesto' => ['required',Rule::in(['IVA (Mensual)','IVA (Semestral)','ICE','ISD (MENSUAL)', 'IRBP', 'ISD (ANUAL)', 'IR (Régimen Sociedad)', 'IR (Régimen Emprendedor)', 'IR (Régimen NP)', 'RETENCIONES FUENTE', 'ANTICIPO UTILIDADES ACUMULADAS', 'ACTIVOS EN EL EXTERIOR', 'IRBP-ANEXO', 'ROTEF', 'OPRE', 'ICT', 'ADI', 'DECLARACIÓN PATRIMONIAL/APP', 'APS-REBEFICS', 'RDEP', 'ATS', 'PRECIOS VENTA ICE'])],
             'dia_vencimiento' => 'required|integer|min:1|max:31',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors'  => $validator->errors(),
                'status'  => 400
            ], 400);
        }

        $fechaExacta = \App\Models\ObligacionTributaria::calcularFechaVencimiento($request->tipo_impuesto, $request->dia_vencimiento);

        \Carbon\Carbon::setLocale('es');
        $tipoUpper = strtoupper(trim($request->tipo_impuesto));

        if ($tipoUpper === 'ANTICIPO UTILIDADES ACUMULADAS') {
            $periodoTexto = 'Agosto - Octubre ' . $fechaExacta->year; 
        } elseif ($tipoUpper === 'IVA (SEMESTRAL)') {
            $periodoTexto = 'Semestre ' . ucfirst($fechaExacta->translatedFormat('F Y')); 
        } else {
            $periodoTexto = ucfirst($fechaExacta->translatedFormat('F Y'));
        }

        $obligacion = ObligacionTributaria::create([
            'cliente_id'         => $request->cliente_id,
            'usuario_id'         => Auth::id() ?? 1,
            'tipo_impuesto'      => $request->tipo_impuesto,
            'fecha_presentacion' => $periodoTexto,
            'fecha_vencimiento_exacta' => $fechaExacta->format('Y-m-d'),
            'estado'             => 'Pendiente' 
        ]);

        $periodos = BibliotecaPeriodo::where('cliente_id', $obligacion->cliente_id)->get();

        foreach ($periodos as $periodo) {
            $carpetaMadre = BibliotecaSubcarpeta::where('periodo_id', $periodo->id)
                                ->where('nombre', 'Obligaciones Tributarias')
                                ->whereNull('parent_id')
                                ->first();

            if ($carpetaMadre) {
                $carpetaHijaExiste = BibliotecaSubcarpeta::where('parent_id', $carpetaMadre->id)
                                        ->where('nombre', $obligacion->tipo_impuesto)
                                        ->exists();

                if (!$carpetaHijaExiste) {
                    BibliotecaSubcarpeta::create([
                        'periodo_id'    => $periodo->id,
                        'parent_id'     => $carpetaMadre->id,
                        'nombre'        => $obligacion->tipo_impuesto,
                        'creado_por_id' => Auth::id() ?? 1 
                    ]);
                }
            }
        }

        return response()->json([
            'message'    => 'Obligación añadida y carpetas sincronizadas con éxito',
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