<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class PreguntaScore extends Model
{
    use HasFactory;

    protected $table = 'preguntas_score';

    protected $fillable = [
        'enunciado',
        'peso_maximo',
        'activa'
    ];
}
