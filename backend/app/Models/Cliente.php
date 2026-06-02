<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $table = 'clientes';

    protected $fillable = [
        'tipo_persona',
        'razon_social_nombres',
        'identificacion',
        'direccion_matriz',
        'score_tributario',
        'proximo_vencimiento',
        'gestionado_por_id'
    ];

    protected $casts = [
        'score_tributario' => 'integer',
        'proximo_vencimiento' => 'date:Y-m-d',
    ];

    public function usuarios()
    {
        return $this->hasMany(Usuario::class, 'cliente_id');
    }
    
    public function periodos()
    {
        return $this->hasMany(BibliotecaPeriodo::class, 'cliente_id');
    }

    public function obligaciones()
    {
        return $this->hasMany(ObligacionTributaria::class, 'cliente_id');
    }
    public function gestores()
    {
        return $this->belongsToMany(Usuario::class, 'cliente_gestor', 'cliente_id', 'usuario_id')
                    ->select(['usuarios.usuario', 'nombre', 'apellido'])
                    ->withTrashed();
    }
}