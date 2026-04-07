<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Noticias extends Model
{
    use HasFactory;
    protected $table = 'noticias';

    protected $fillable = [
        'creado_por_id',
        'titulo',
        'fuente',
        'descripcion_corta',
        'url_destino',
        'imagen_url'
    ];

    public function creador()
    {
        return $this->belongsTo(Usuario::class, 'creado_por_id')->select(['id', 'nombre', 'apellido']);
    }
}
