<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable; 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens; 
use Illuminate\Database\Eloquent\SoftDeletes;



class Usuario extends Authenticatable
{
        use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'usuarios';
    protected $fillable = [
        'rol_id',
        'cliente_id',
        'nombre',
        'apellido',
        'correo',
        'correo_personal',
        'password_hash',
        'cargo',
        'activo',
        'ultimo_acceso'
    ];

    protected $hidden = [
        'password_hash',
    ];

    protected $casts = [
        'activo' => 'boolean',
        'ultimo_acceso' => 'datetime',
    ];

    public function getAuthPassword()
    {
        return $this->password_hash;
    }
    
    public function rol()
    {
        return $this->belongsTo(Rol::class, 'rol_id');
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

}