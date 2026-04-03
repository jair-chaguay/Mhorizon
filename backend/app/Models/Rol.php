<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Rol extends Model
{
    use HasFactory;
    protected $table = 'roles';

    protected $fillable = [
        'nombre',
        'es_interno',
        'nivel_acceso'
    ];

    protected $casts = [
        'es_interno' => 'boolean',
        'nivel_acceso' => 'integer',
    ];

    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'rol_id');
    }

}
