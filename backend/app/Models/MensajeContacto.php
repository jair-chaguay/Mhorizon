<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MensajeContacto extends Model
{
    use HasFactory;

    protected $table = 'mensajes_contacto';

    protected $fillable = [
        'nombre',
        'apellido',
        'correo',
        'mensaje',
        'leido',
        'leido_por_id'
    ];

    protected $casts = [
        'leido' => 'boolean',
    ];

    public function leidoPor()
    {
        return $this->belongsTo(Usuario::class, 'leido_por_id')->select(['id', 'nombre', 'apellido']);
    }
}