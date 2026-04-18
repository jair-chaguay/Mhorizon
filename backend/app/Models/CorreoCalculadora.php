<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CorreoCalculadora extends Model
{
    use HasFactory;
    protected $table = 'correo_calculadora';

    protected $fillable = [
        'correo',
        'tipo_contribuyente',
        'regimen'
    ];
    //
}
