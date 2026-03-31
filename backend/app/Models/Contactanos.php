<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contactanos extends Model
{
    use HasFactory;

    protected $table = 'contactanos';

    protected $fillable =[
        'name',
        'email',
        'asunto',
        'mensaje',
        'fechaEnvio'
    ];
}
