<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClienteCorreo extends Model
{
    protected $table = 'cliente_correos';

    protected $fillable = [
        'cliente_id',
        'correo'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }
}