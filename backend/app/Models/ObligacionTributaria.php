<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ObligacionTributaria extends Model
{
    use HasFactory;

    protected $table = 'obligaciones_tributarias';

    protected $fillable = [
        'cliente_id',
        'usuario_id',
        'tipo_impuesto',
        'fecha_presentacion',
        'fecha_vencimiento_exacta',
        'estado'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function creador()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    /**
     * Calcula la fecha inicial basada en el tipo de impuesto y el día
     */
    public static function calcularFechaVencimiento($tipoImpuesto, $dia)
    {
        $hoy = Carbon::now();
        $anioActual = $hoy->year;
        $mesActual = $hoy->month;
        $tipo = strtoupper(trim($tipoImpuesto));

        $semestrales = [
            'IVA (RÉGIMEN RIMPE)',
            'IMPUESTO A LA RENTA (RÉGIMEN RIMPE SEMESTRAL)',
            'RETENCIONES EN LA FUENTE DEL IR (RÉGIMEN RIMPE)',
            'ANEXO TRANSACCIONAL SIMPLIFICADO - ATS (RÉGIMEN RIMPE)'
        ];
        if(in_array($tipo, $semestrales)){
            if($mesActual < 1 || ($mesActual == 1 && $hoy->day < $dia)){
                return Carbon::createFromDate($anioActual, 1, $dia);
            } 
            // Si pasamos enero pero no hemos llegado a la de julio
            elseif ($mesActual < 7 || ($mesActual == 7 && $hoy->day < $dia)) {
                return Carbon::createFromDate($anioActual, 7, $dia);
            }
            // Si ya pasamos julio, la siguiente es enero del próximo año
            return Carbon::createFromDate($anioActual + 1, 1, $dia);
        }

        $mesesFijos = [
            'ANEXO DE PRECIOS DE VENTA AL PÚBLICO (ICE - PVP)' => 1, // Enero
            'ANEXO DE GASTOS PERSONALES' => 2, // Febrero
            'REPORTE BENEFICIARIOS FINALES Y COMPOSICIÓN SOCIETARIA (REBEFICS)' => 2,
            'ANEXO DE RELACION DE DEPENDENCIA (RDEP)' => 2,
            'ANEXO DE OPERACIONES Y TRANSACCIONES ECONÓMICAS FINANCIERAS (ROTEF)' => 2,
            'IMPUESTO A LA RENTA (PERSONAS NATURALES)' => 3, // Marzo
            'DÉCIMO CUARTO SUELDO (COSTA)' => 3,
            'IMPUESTO A LA RENTA (SOCIEDADES)' => 4, // Abril
            'IMPUESTO A LA SALIDA DE DIVISAS - ISD TARJETAS DE CRÉDITO' => 4,
            'PRESENTACIÓN ESTADOS FINANCIEROS' => 4,
            'PARTICIPACIÓN DE UTILIDADES (15%)' => 4,
            'IMPUESTO A LA RENTA (PERSONAS NATURALES RÉGIMEN RIMPE ANUAL)' => 5, // Mayo
            'ANEXO DE DIVIDENDOS (ADI)' => 5,
            'DECLARACIÓN PATRIMONIAL PERSONAS NATURALES' => 5,
            'PATENTE MUNICIPAL' => 5,
            'IMPUESTO 1.5 POR MIL SOBRE ACTIVOS' => 5,
            'TASA DE HABILITACIÓN/LUAE' => 5,
            'PERMISO DE FUNCIONAMIENTO' => 5,
            'TASA DE BOMBEROS' => 5,
            'ANEXO DE OPERACIONES CON PARTES RELACIONADAS' => 6, // Junio
            'IMPUESTO A LA SALIDA DE DIVISAS - ISD PRESUNTIVO' => 6,
            'INFORME DE PRECIOS DE TRANSFERENCIA' => 6,
            'IMPUESTO PREDIAL URBANO' => 6,
            'IMPUESTO PREDIAL RURAL' => 6,
            'DÉCIMO CUARTO SUELDO (SIERRA)' => 8, // Agosto
            'DECLARACIÓN DEL PAGO A CUENTA SOBRE UTILIDADES NO DISTRIBUIDAS' => 8,
            'ANTICIPO UTILIDADES ACUMULADAS' => 8,
            'CONTRIBUCIÓN SOCIETARIA' => 9, // Septiembre 
            'TASA MUNICIPAL POR PUBLICIDAD EXTERIOR' => 10, // Octubre
            'DÉCIMO TERCER SUELDO' => 12 // Diciembre
        ];

        if (array_key_exists($tipo, $mesesFijos)) {
            $fechaCalculada = Carbon::createFromDate($anioActual, $mesesFijos[$tipo], $dia);
            
            if ($fechaCalculada->lessThan(Carbon::today())) {
                $fechaCalculada->addYear();
            }
            return $fechaCalculada;
        }

        $fechaCalculada = Carbon::createFromDate($anioActual, $mesActual, $dia)->startOfDay();
        if ($fechaCalculada->lessThan(Carbon::today())) {
            $fechaCalculada->addMonth();
        }
        
        return $fechaCalculada;
    }

    
    public function obtenerMesesFrecuencia()
    {
        $tipo = strtoupper(trim($this->tipo_impuesto));

        $semestrales = [
            'IVA (RÉGIMEN RIMPE)', 'IMPUESTO A LA RENTA (RÉGIMEN RIMPE SEMESTRAL)', 
            'RETENCIONES EN LA FUENTE DEL IR (RÉGIMEN RIMPE)', 'ANEXO TRANSACCIONAL SIMPLIFICADO - ATS (RÉGIMEN RIMPE)'
        ];
        if (in_array($tipo, $semestrales)) return 6;

        $mensuales = [
            'IVA (MENSUAL)', 'RETENCIONES FUENTE IR (MENSUAL)', 'DECLARACIÓN DE AUTORETENCIONES EN LA FUENTE DEL IR', 'DECLARACIÓN DEL IMPUESTO REDIMIBLE A LAS BOTELLAS PLÁSTICAS', 'ANEXO TRANSACCIONAL SIMPLIFICADO - ATS (MENSUAL)',
            'ANEXO IMPUESTO CONSUMOS ESPECIALES (ICE)', 'ANEXO IMPUESTO REDIMIBLE A LAS BOTELLAS PLÁSTICAS', 'PAGO DE APORTE AL IESS', 'FONDOS DE RESERVA', 'IMPUESTO A LOS CONSUMOS ESPECIALES - ICE (MENSUAL)', 
            'IMPUESTO A LA SALIDA DE DIVISAS - ISD (MENSUAL)', 'IMPUESTO A LOS ACTIVOS EN EL EXTERIOR', 'REPORTE OPERACIONES INUSUALES INJUSTIFICADAS (ROI)', 'REPORTE OPERACIONES IGUALES O SUPERIORES AL UMBRAL LEGAL', 'REPORTE VENTAS A CRÉDITO'
        ];
        if (in_array($tipo, $mensuales)) return 1;
        
        return 12; // Anuales
    }


    public function calcularProximoVencimiento()
    {
        return Carbon::parse($this->fecha_vencimiento_exacta)->addMonths($this -> obtenerMesesFrecuencia());
    }
}