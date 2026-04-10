<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    protected $table = 'documentos';
    protected $fillable = [
        'subcarpeta_id', 'subido_por_id', 'modificado_por_id', 
        'nombre_archivo', 'tipo', 'url_archivo', 'observacion_cliente'
    ];

    public function subidoPor() {
        return $this->belongsTo(Usuario::class, 'subido_por_id')->select(['id', 'nombre', 'apellido'])->withTrashed();;
    }
}
