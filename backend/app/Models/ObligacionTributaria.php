<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObligacionTributaria extends Model
{
    use HasFactory;

    // Especificamos la tabla si Laravel no la deduce automáticamente
    protected $table = 'obligaciones_tributarias';

    // Permitimos la asignación masiva de estos campos
    protected $fillable = [
        'cliente_id',
        'tipo_impuesto',
        'fecha_presentacion',
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