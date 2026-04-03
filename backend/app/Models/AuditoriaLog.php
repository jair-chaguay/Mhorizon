<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request; // Para capturar la IP automáticamente

class AuditoriaLog extends Model
{
    protected $table = 'auditoria_logs';

    public $timestamps = false; 

    protected $fillable = [
        'usuario_id',
        'accion',
        'tabla_afectada',
        'registro_id',
        'descripcion',
        'direccion_ip',
        'created_at'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id')->select(['id', 'nombre', 'apellido', 'rol_id']);
    }

    public static function registrar($accion, $tabla_afectada, $registro_id, $descripcion)
    {
        if (Auth::check()) {
            self::create([
                'usuario_id' => Auth::id(),
                'accion' => strtoupper($accion),
                'tabla_afectada' => strtolower($tabla_afectada),
                'registro_id' => $registro_id,
                'descripcion' => $descripcion,
                'direccion_ip' => Request::ip(), // Laravel captura la IP real de la petición
                'created_at' => now()
            ]);
        }
    }
}