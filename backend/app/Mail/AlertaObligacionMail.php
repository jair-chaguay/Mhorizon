<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\ObligacionTributaria;
use App\Models\Usuario;

class AlertaObligacionMail extends Mailable
{
    use Queueable, SerializesModels;

    public $obligacion;
    public $admin;

    public function __construct(ObligacionTributaria $obligacion, Usuario $admin)
    {
        $this->obligacion = $obligacion;
        $this->admin = $admin;
    }

    public function build()
    {
        return $this->subject('ACCIÓN REQUERIDA: Subir obligación de ' . $this->obligacion->cliente->razon_social_nombres)
                    ->view('emails.alerta_obligacion');
    }
}