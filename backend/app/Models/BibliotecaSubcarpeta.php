<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class BibliotecaSubcarpeta extends Model
{
    protected $table = 'biblioteca_subcarpetas';
    protected $fillable = ['periodo_id', 'nombre', 'creado_por_id'];

    public function documentos() {
        return $this->hasMany(Documento::class, 'subcarpeta_id');
    }
}