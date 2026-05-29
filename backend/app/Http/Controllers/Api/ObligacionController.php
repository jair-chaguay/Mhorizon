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
        $hoy = \Carbon\Carbon::today()->format('Y-m-d');
        $obligaciones = ObligacionTributaria::with('creador')
        ->where('cliente_id', $cliente_id)
        ->whereDate('fecha_vencimiento_exacta', '>=', $hoy)
        ->get();
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
            'usuario_id' => 'required|exists:usuarios,id',
            'tipo_impuesto' => ['required', Rule::in([
                'IVA (MENSUAL)', 'RETENCIONES FUENTE IR (MENSUAL)', 'RETENCIONES IVA', 
                'IRBP', 'ATS (MENSUAL)', 'ANEXO ICE', 'ANEXO IRBP', 'PAGO APORTE IESS', 
                'FONDOS DE RESERVA', 'ANEXO REOC', 'ICE (MENSUAL)', 'ISD (MENSUAL)',
                'IVA (RÉGIMEN RIMPE)', 'IR (RÉGIMEN RIMPE SEMESTRAL)', 'RETENCIONES IR (RÉGIMEN RIMPE)', 
                'ATS (RÉGIMEN RIMPE)', 'ICE (SEMESTRAL)', 'ICE - PVP', 'ANEXO GASTOS PERSONALES', 
                'APS', 'RDEP', 'ROTEF', 'IR (PERSONAS NATURALES)', 'DÉCIMO CUARTO SUELDO (COSTA)', 
                'DÉCIMO CUARTO SUELDO (SIERRA)', 'IR (SOCIEDADES)', 'ISD (ANUAL)', 
                'PRESENTACIÓN ESTADOS FINANCIEROS', 'PARTICIPACIÓN DE UTILIDADES', 
                'IR (RIMPE ANUAL)', 'ADI', 'DECLARACIÓN PATRIMONIAL', 'PATENTE MUNICIPAL', 
                'IMPUESTO 1.5 POR MIL', 'LUAE', 'PERMISO DE FUNCIONAMIENTO', 'TASA DE BOMBEROS', 
                'ANEXO PARTES RELACIONADAS', 'INFORME PRECIOS DE TRANSFERENCIA', 
                'IMPUESTO PREDIAL URBANO', 'IMPUESTO PREDIAL RURAL', 'PAGO A CUENTA', 
                'ANTICIPO UTILIDADES ACUMULADAS', 'CONTRIBUCIÓN SOCIETARIA', 
                'IMPUESTO PUBLICIDAD EXTERIOR', 'DÉCIMO TERCER SUELDO'
            ])],
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

        $semestrales = [
            'IVA (RÉGIMEN RIMPE)', 'IR (RÉGIMEN RIMPE SEMESTRAL)', 
            'RETENCIONES IR (RÉGIMEN RIMPE)', 'ATS (RÉGIMEN RIMPE)', 'ICE (SEMESTRAL)'
        ];

        if ($tipoUpper === 'ANTICIPO UTILIDADES ACUMULADAS') {
            $periodoTexto = 'Agosto - Octubre ' . $fechaExacta->year; 
        } elseif (in_array($tipoUpper, $semestrales)) {
            $periodoTexto = 'Semestre ' . ucfirst($fechaExacta->translatedFormat('F Y')); 
        } else {
            $periodoTexto = ucfirst($fechaExacta->translatedFormat('F Y'));
        }

        $obligacion = ObligacionTributaria::create([
            'cliente_id'         => $request->cliente_id,
            'usuario_id'         => $request->usuario_id,
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
     * Actualizar el encargado (usuario) de la obligación tributaria.
     */
    public function update(Request $request, $id)
    {
        $obligacion = ObligacionTributaria::find($id);

        if (!$obligacion) {
            return response()->json(['message' => 'Obligación no encontrada', 'status' => 404], 404);
        }

        $validator = Validator::make($request->all(), [
            'usuario_id' => 'required|exists:usuarios,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors(), 'status' => 400], 400);
        }

        $obligacion->usuario_id = $request->usuario_id;
        $obligacion->save();

        return response()->json([
            'message'    => 'Encargado de obligación actualizado exitosamente.',
            'obligacion' => $obligacion->load('creador'),
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