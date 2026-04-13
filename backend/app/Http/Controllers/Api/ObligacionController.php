<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ObligacionTributaria;
use Illuminate\Support\Facades\Validator;

// IMPORTANTE: Añadir estos tres "use" para poder manipular las carpetas
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
            'cliente_id'         => 'required|exists:clientes,id',
            'tipo_impuesto'      => 'required|in:Impuesto a la Renta,IVA (Mensual),IVA (Semestral),ICE,ISD,Activos Mantenidos en el Exterior,Anexo Transaccional (ATS)',
            'fecha_presentacion' => 'required|string|max:255',
            'fecha_vencimiento_exacta' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors'  => $validator->errors(),
                'status'  => 400
            ], 400);
        }

        // 1. Crear la Obligación normalmente
        $obligacion = ObligacionTributaria::create([
            'cliente_id'         => $request->cliente_id,
            'tipo_impuesto'      => $request->tipo_impuesto,
            'fecha_presentacion' => $request->fecha_presentacion,
            'fecha_vencimiento_exacta' => $request->fecha_vencimiento_exacta,
            'estado'             => 'Pendiente' // Estado por defecto
        ]);

        // ---------------------------------------------------------
        // 2. SINCRONIZACIÓN REACTIVA DE CARPETAS
        // ---------------------------------------------------------
        // Buscamos todos los periodos que el cliente ya tenga creados
        $periodos = BibliotecaPeriodo::where('cliente_id', $obligacion->cliente_id)->get();

        foreach ($periodos as $periodo) {
            // Buscamos la carpeta madre "Obligaciones Tributarias" de ese periodo
            $carpetaMadre = BibliotecaSubcarpeta::where('periodo_id', $periodo->id)
                                ->where('nombre', 'Obligaciones Tributarias')
                                ->whereNull('parent_id')
                                ->first();

            // Si la carpeta madre existe, procedemos a crear la hija
            if ($carpetaMadre) {
                // Verificamos que no exista ya para no duplicarla
                $carpetaHijaExiste = BibliotecaSubcarpeta::where('parent_id', $carpetaMadre->id)
                                        ->where('nombre', $obligacion->tipo_impuesto)
                                        ->exists();

                if (!$carpetaHijaExiste) {
                    BibliotecaSubcarpeta::create([
                        'periodo_id'    => $periodo->id,
                        'parent_id'     => $carpetaMadre->id,
                        'nombre'        => $obligacion->tipo_impuesto,
                        'creado_por_id' => Auth::id() ?? 1 // El fallback a 1 previene errores si Auth falla
                    ]);
                }
            }
        }
        // ---------------------------------------------------------

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