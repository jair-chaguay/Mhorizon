<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Declaracion extends Model
{
    use HasFactory;

    protected $table = 'declaraciones';

    protected $fillable = [
        'empresa_id',
        'creado_por_id',
        'modificado_por_id',
        'periodo_fiscal',
        'tipo_impuesto',
        'estado',
        'fecha_presentacion',
        'comprobante_url',
        'observacion_interna'
    ];

    protected $casts = [
        'fecha_presentacion' => 'date:Y-m-d',
    ];


    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id')->select(['id', 'razon_social', 'ruc']);
    }

    public function creador()
    {
        return $this->belongsTo(Usuario::class, 'creado_por_id')->select(['id', 'nombre', 'apellido']);
    }

    public function modificador()
    {
        return $this->belongsTo(Usuario::class, 'modificado_por_id')->select(['id', 'nombre', 'apellido']);
    }
}