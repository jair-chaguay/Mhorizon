<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    /**
     * Relación: Una obligación pertenece a un cliente.
     */
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }
}