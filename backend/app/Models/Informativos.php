<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Informativos extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descripcion',
        'archivo',
        'fechaRegistro'
    ];
}
