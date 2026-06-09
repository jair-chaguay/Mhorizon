<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class BibliotecaSubcarpeta extends Model
{
    protected $table = 'biblioteca_subcarpetas';
    protected $fillable = ['cliente_id', 'parent_id', 'nombre', 'creado_por_id'];

    public function padre(){
        return $this->belongsTo(BibliotecaSubcarpeta::class, 'parent_id');
    }

    public function documentos() {
        return $this->hasMany(Documento::class, 'subcarpeta_id');
    }

    public function subcarpetas() {
        return $this->hasMany(BibliotecaSubcarpeta::class, 'parent_id');
    }

    public function cliente(){
        return $this->hasMany(Cliente::class, 'cliente_id');
    }
}