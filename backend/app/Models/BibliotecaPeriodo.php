<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BibliotecaPeriodo extends Model
{
    use HasFactory;
    
    protected $table = 'biblioteca_periodos';
    
    protected $fillable = ['cliente_id', 'anio', 'creado_por_id'];

    public function subcarpetas() 
    {
        return $this->hasMany(BibliotecaSubcarpeta::class, 'periodo_id');
    }
    
    public function cliente() 
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }
}