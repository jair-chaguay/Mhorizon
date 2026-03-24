<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Suscriptores extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'fechaRegistro'
    ];

}
