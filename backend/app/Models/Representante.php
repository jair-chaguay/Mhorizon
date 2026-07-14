<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Representante extends Model
{
    protected $fillable = ['cliente_id', 'nombre', 'correo', 'cargo','telefono'];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
}