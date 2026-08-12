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
        'identificacion',
        'direccion_matriz',
        'score_tributario',
        'proximo_vencimiento',
        'gestionado_por_id',
        'comentario_score',
        'detalle_score',
        'tipo_contribuyente',
        'regimen_tributario',
        'agente_retencion',
        'actividad_economica',
        'sector',
        'telefono_contacto',
        'razon_social_nombres',
        'representante_nombre',
        'representante_correo',
        'representante_cargo',
        'tipo_servicio'
    ];

    protected $casts = [
        'score_tributario' => 'integer',
        'proximo_vencimiento' => 'date:Y-m-d',
        'detalle_score' => 'array',
        'agente_retencion' => 'boolean',
        'tipo_servicio' => 'array'

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
                    ->select(['usuarios.id', 'nombre', 'apellido'])
                    ->withTrashed();
    }

    public function carpetasRaiz(){
        return $this->hasMany(BibliotecaSubcarpeta::class, 'cliente_id')->whereNull('parent_id');
    }

    public function representantes(){
        return $this->hasMany(Representante::class, 'cliente_id');
    }
}