<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Informativo extends Model
{
    use HasFactory;
    protected $table = 'informativos';
    protected $fillable = [
        'creado_por_id',
        'modificado_por_id',
        'titulo',
        'resolucion_oficial',
        'contenido',
        'descripcion_portada',
        'imagen_portada_url',
        'pdf_url'
    ];

    public function creador()
    {
        return $this->belongsTo(Usuario::class, 'creado_por_id')->select(['id', 'nombre', 'apellido']);
    }

    public function modificador()
    {
        return $this->belongsTo(Usuario::class, 'modificado_por_id')->select(['id', 'nombre', 'apellido']);
    }

    public function getImagenPortadaUrlAttribute($value)
    {
        if ($value) {
            if (filter_var($value, FILTER_VALIDATE_URL)) {
                return $value;
            }
            return secure_asset($value);
        }
        return null;
    }

    public function getPdfUrlAttribute($value)
    {
        if ($value) {
            if (filter_var($value, FILTER_VALIDATE_URL)) {
                return $value;
            }
            return secure_asset($value);
        }
        return null;
    }
}