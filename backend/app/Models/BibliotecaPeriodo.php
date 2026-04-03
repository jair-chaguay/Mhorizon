<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class BibliotecaPeriodo extends Model
{
    protected $table = 'biblioteca_periodos';
    protected $fillable = ['empresa_id', 'anio', 'creado_por_id'];

    public function subcarpetas() {
        return $this->hasMany(BibliotecaSubcarpeta::class, 'periodo_id');
    }
}
