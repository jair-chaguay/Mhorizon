<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CorreoInformativo extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'nombres',
        'source',
        'is_active'
    ];
}
