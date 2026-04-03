<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Noticias extends Model
{
    use HasFactory;
    protected $table = 'noticias';

    protected $fillable = [
        'creador_por_id',
        'titulo',
        'fuente',
        'descripcion_corta',
        'url_destino',
        'url_imagen'
    ];

    public function creador()
    {
        return $this->belongsTo(Usuario::class, 'creador_por')->select(['id', 'nombre', 'apellido']);
    }
}
