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
            'IR (RÉGIMEN RIMPE SEMESTRAL)',
            'RETENCIONES IR (RÉGIMEN RIMPE)',
            'ATS (RÉGIMEN RIMPE)',
            'ICE (SEMESTRAL)'
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
            'ICE - PVP' => 1, // Enero
            'ANEXO GASTOS PERSONALES' => 2, // Febrero
            'APS' => 2,
            'RDEP' => 2,
            'ROTEF' => 2,
            'IR (PERSONAS NATURALES)' => 3, // Marzo
            'DÉCIMO CUARTO SUELDO (COSTA)' => 3,
            'IR (SOCIEDADES)' => 4, // Abril
            'ISD (ANUAL)' => 4,
            'PRESENTACIÓN ESTADOS FINANCIEROS' => 4,
            'PARTICIPACIÓN DE UTILIDADES' => 4,
            'IR (RIMPE ANUAL)' => 5, // Mayo
            'ADI' => 5,
            'DECLARACIÓN PATRIMONIAL' => 5,
            'PATENTE MUNICIPAL' => 5,
            'IMPUESTO 1.5 POR MIL' => 5,
            'LUAE' => 5,
            'PERMISO DE FUNCIONAMIENTO' => 5,
            'TASA DE BOMBEROS' => 5,
            'ANEXO PARTES RELACIONADAS' => 6, // Junio
            'INFORME PRECIOS DE TRANSFERENCIA' => 6,
            'IMPUESTO PREDIAL URBANO' => 6,
            'IMPUESTO PREDIAL RURAL' => 6,
            'DÉCIMO CUARTO SUELDO (SIERRA)' => 8, // Agosto
            'PAGO A CUENTA' => 8,
            'ANTICIPO UTILIDADES ACUMULADAS' => 8,
            'CONTRIBUCIÓN SOCIETARIA' => 9, // Septiembre 
            'IMPUESTO PUBLICIDAD EXTERIOR' => 10, // Octubre
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
            'IVA (RÉGIMEN RIMPE)', 'IR (RÉGIMEN RIMPE SEMESTRAL)', 
            'RETENCIONES IR (RÉGIMEN RIMPE)', 'ATS (RÉGIMEN RIMPE)', 'ICE (SEMESTRAL)'
        ];
        if (in_array($tipo, $semestrales)) return 6;

        $mensuales = [
            'IVA (MENSUAL)', 'RETENCIONES FUENTE IR (MENSUAL)', 'RETENCIONES IVA', 
            'IRBP', 'ATS (MENSUAL)', 'ANEXO ICE', 'ANEXO IRBP', 'PAGO APORTES IESS', 
            'FONDOS DE RESERVA', 'ANEXO REOC', 'ICE (MENSUAL)', 'ISD (MENSUAL)'
        ];
        if (in_array($tipo, $mensuales)) return 1;
        
        return 12; // Anuales
    }


    public function calcularProximoVencimiento()
    {
        return Carbon::parse($this->fecha_vencimiento_exacta)->addMonths($this -> obtenerMesesFrecuencia());
    }
}