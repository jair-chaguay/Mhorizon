<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ObligacionTributaria;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\BibliotecaSubcarpeta;
use Illuminate\Support\Facades\Auth;

class ObligacionController extends Controller
{

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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required|exists:clientes,id',
            'usuario_id' => [
                'required',
                'exists:usuarios,id',
                Rule::exists('cliente_gestor', 'usuario_id')->where('cliente_id', $request->cliente_id)
            ],
            'tipo_impuesto' => ['required', Rule::in([
                'IVA (MENSUAL)', 'RETENCIONES FUENTE IR (MENSUAL)', 'DECLARACIÓN DE AUTORETENCIONES EN LA FUENTE DEL IR', 'DECLARACIÓN DEL IMPUESTO REDIMIBLE A LAS BOTELLAS PLÁSTICAS', 'ANEXO TRANSACCIONAL SIMPLIFICADO - ATS (MENSUAL)', 
                'ANEXO IMPUESTO CONSUMOS ESPECIALES (ICE)', 'ANEXO IMPUESTO REDIMIBLE A LAS BOTELLAS PLÁSTICAS', 'PAGO DE APORTE AL IESS', 'FONDOS DE RESERVA', 'IMPUESTO A LOS CONSUMOS ESPECIALES - ICE (MENSUAL)', 
                'IMPUESTO A LA SALIDA DE DIVISAS - ISD (MENSUAL)', 'IMPUESTO A LOS ACTIVOS EN EL EXTERIOR', 'REPORTE OPERACIONES INUSUALES INJUSTIFICADAS (ROI)', 'REPORTE OPERACIONES IGUALES O SUPERIORES AL UMBRAL LEGAL', 
                'REPORTE VENTAS A CRÉDITO', 'IVA (RÉGIMEN RIMPE)', 'IMPUESTO A LA RENTA (RÉGIMEN RIMPE SEMESTRAL)', 'RETENCIONES EN LA FUENTE DEL IR (RÉGIMEN RIMPE)', 'ANEXO TRANSACCIONAL SIMPLIFICADO - ATS (RÉGIMEN RIMPE)', 
                'ANEXO DE PRECIOS DE VENTA AL PÚBLICO (ICE - PVP)', 'ANEXO DE GASTOS PERSONALES', 'REPORTE BENEFICIARIOS FINALES Y COMPOSICIÓN SOCIETARIA (REBEFICS)', 'ANEXO DE RELACION DE DEPENDENCIA (RDEP)', 
                'ANEXO DE OPERACIONES Y TRANSACCIONES ECONÓMICAS FINANCIERAS (ROTEF)', 'IMPUESTO A LA RENTA (PERSONAS NATURALES)', 'DÉCIMO CUARTO SUELDO (COSTA)', 'DÉCIMO CUARTO SUELDO (SIERRA)', 'IMPUESTO A LA RENTA (SOCIEDADES)', 
                'IMPUESTO A LA SALIDA DE DIVISAS - ISD TARJETAS DE CRÉDITO', 'IMPUESTO A LA SALIDA DE DIVISAS - ISD PRESUNTIVO', 'PRESENTACIÓN ESTADOS FINANCIEROS', 'PARTICIPACIÓN DE UTILIDADES (15%)', 
                'IMPUESTO A LA RENTA (PERSONAS NATURALES RÉGIMEN RIMPE ANUAL)', 'ANEXO DE DIVIDENDOS (ADI)', 'DECLARACIÓN PATRIMONIAL PERSONAS NATURALES', 'PATENTE MUNICIPAL', 'IMPUESTO 1.5 POR MIL SOBRE ACTIVOS', 
                'TASA DE HABILITACIÓN/LUAE', 'PERMISO DE FUNCIONAMIENTO', 'TASA DE BOMBEROS', 'ANEXO DE OPERACIONES CON PARTES RELACIONADAS', 'INFORME DE PRECIOS DE TRANSFERENCIA', 'IMPUESTO PREDIAL URBANO', 'IMPUESTO PREDIAL RURAL', 
                'DECLARACIÓN DEL PAGO A CUENTA SOBRE UTILIDADES NO DISTRIBUIDAS', 'CONTRIBUCIÓN SOCIETARIA', 'TASA MUNICIPAL POR PUBLICIDAD EXTERIOR', 'DÉCIMO TERCER SUELDO'
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
            'IVA (RÉGIMEN RIMPE)', 'IMPUESTO A LA RENTA (RÉGIMEN RIMPE SEMESTRAL)', 
            'RETENCIONES EN LA FUENTE DEL IR (RÉGIMEN RIMPE)', 'ANEXO TRANSACCIONAL SIMPLIFICADO - ATS (RÉGIMEN RIMPE)'
        ];

        if ($tipoUpper === 'CONTRIBUCIÓN SOCIETARIA') {
            $periodoTexto = 'Septiembre - Diciembre ' . $fechaExacta->year; 
        } elseif (in_array($tipoUpper, $semestrales)) {
            $periodoTexto = 'Semestre ' . ucfirst($fechaExacta->translatedFormat('F')); 
        } else {
            $periodoTexto = ucfirst($fechaExacta->translatedFormat('F'));
        }

        $obligacion = ObligacionTributaria::create([
            'cliente_id'         => $request->cliente_id,
            'usuario_id'         => $request->usuario_id,
            'tipo_impuesto'      => $request->tipo_impuesto,
            'fecha_presentacion' => $periodoTexto,
            'fecha_vencimiento_exacta' => $fechaExacta->format('Y-m-d'),
            'estado'             => 'Pendiente' 
        ]);

        // Asegurar que exista la carpeta raíz de Obligaciones
        $carpetaMadre = BibliotecaSubcarpeta::firstOrCreate(
            ['cliente_id' => $obligacion->cliente_id, 'parent_id' => null, 'nombre' => 'Obligaciones Tributarias'],
            ['creado_por_id' => Auth::id() ?? 1]
        );

        $carpetaImpuesto = BibliotecaSubcarpeta::firstOrCreate(
            ['parent_id' => $carpetaMadre->id, 'nombre' => $obligacion->tipo_impuesto],
            ['creado_por_id' => Auth::id() ?? 1]
        );

        $anio = $fechaExacta->format('Y');
        $carpetaAnio = BibliotecaSubcarpeta::firstOrCreate(
            ['parent_id' => $carpetaImpuesto->id, 'nombre' => $anio],
            ['creado_por_id' => Auth::id() ?? 1]
        );

        $esMensual = in_array($tipoUpper, [
            'IVA (MENSUAL)', 'RETENCIONES FUENTE IR (MENSUAL)', 'DECLARACIÓN DE AUTORETENCIONES EN LA FUENTE DEL IR', 'DECLARACIÓN DEL IMPUESTO REDIMIBLE A LAS BOTELLAS PLÁSTICAS', 'ANEXO TRANSACCIONAL SIMPLIFICADO - ATS (MENSUAL)', 
            'ANEXO IMPUESTO CONSUMOS ESPECIALES (ICE)', 'ANEXO IMPUESTO REDIMIBLE A LAS BOTELLAS PLÁSTICAS', 'PAGO DE APORTE AL IESS', 'FONDOS DE RESERVA', 'IMPUESTO A LOS CONSUMOS ESPECIALES - ICE (MENSUAL)', 
            'IMPUESTO A LA SALIDA DE DIVISAS - ISD (MENSUAL)', 'IMPUESTO A LOS ACTIVOS EN EL EXTERIOR', 'REPORTE OPERACIONES INUSUALES INJUSTIFICADAS (ROI)', 'REPORTE OPERACIONES IGUALES O SUPERIORES AL UMBRAL LEGAL', 
            'REPORTE VENTAS A CRÉDITO'
        ]);

        $esSemestral = in_array($tipoUpper, $semestrales);

        if ($esMensual || $esSemestral) {
            BibliotecaSubcarpeta::firstOrCreate(
                ['parent_id' => $carpetaAnio->id, 'nombre' => $periodoTexto], // Ej: "Enero 2024"
                ['creado_por_id' => Auth::id() ?? 1]
            );
        }
        
        return response()->json([
            'message'    => 'Obligación añadida y estructura base sincronizada con éxito',
            'obligacion' => $obligacion,
            'status'     => 201
        ], 201);
    }

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