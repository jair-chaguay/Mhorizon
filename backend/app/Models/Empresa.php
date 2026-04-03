<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Empresa extends Model
{
    use HasFactory;
    protected $table = 'empresas';

    protected $fillable = [
        'razon_social',
        'ruc',
        'direccion_matriz',
        'score_tributario',
        'proximo_vencimiento',
        'creado_por_id'
    ];

    protected $casts = [
        'score_tributario' => 'integer',
        'proximo_vencimiento' => 'date:Y-m-d',
    ];

    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'empresa_id');
    }

    public function creador()
    {
        return $this->belongsTo(Usuario::class, 'creado_por_id')->select(['id', 'nombre', 'apellido']);
    }
    
}
