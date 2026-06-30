<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class PreguntaScore extends Model
{
    use HasFactory;

    protected $table = 'pregunta_scores';

    protected $fillable = [
        'enunciado',
        'peso_maximo',
        'activa'
    ];
}
