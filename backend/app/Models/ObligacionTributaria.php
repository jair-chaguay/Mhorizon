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
        'tipo_impuesto',
        'fecha_presentacion',
        'fecha_vencimiento_exacta',
        'estado'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
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

        if($tipo === 'IVA (SEMESTRAL)'){
            if($mesActual < 7 || ($mesActual == 7 && $hoy->day < $dia)){
                return Carbon::createFromDate($anioActual, 7, $dia);
            }
            return Carbon::createFromDate($anioActual + 1, 1, $dia);
        }

        $mesesFijos = [
            'ISD'=> 7,
            'PRECIOS VENTA ICE' => 1,
            'ROTEF' => 2,
            'APS-REBEFICS' => 2,
            'RDEP' => 2,
            'ACTIVOS EN EL EXTERIOR' => 5,
            'IR (RÉGIMEN EMRENDEDOR)' => 3,
            'IR (RÉGIMEN SOCIEDAD)' => 4,
            'ADI' => 5,
            'DECLARACIÓN PATRIMONIAL/AAP' => 5,
            'OPRE' => 6,
            'ICT' => 7,
            'ADI'=>5,
            'ANTICIPO UTILIDADES ACUMULADAS' => 10
        ];

        if (array_key_exists($tipo, $mesesFijos)) {
            $fechaCalculada = Carbon::createFromDate($anioActual, $mesesFijos[$tipo], $dia);
            
            if ($fechaCalculada->lessTha(Carbon::today())) {
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
        if (str_contains($tipo, 'SEMESTRAL')) return 6;
        if (str_contains($tipo, 'MENSUAL') || in_array($tipo, ['ICE', 'IRBP', 'RETENCIONES FUENTE', 'IRBP-ANEXO', 'ATS', 'IR (Régimen NP)'])) return 1;
        return 12; // Anuales
    }


    public function calcularProximoVencimiento()
    {
        return Carbon::parse($this->fecha_vencimiento_exacta)->addMonths($this -> obtenerMesesFrecuencia());
    }
}