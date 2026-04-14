<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use App\Models\ObligacionTributaria;

class ObligacionSubidaMail extends Mailable
{
    use Queueable;

    public $obligacion;

    public function __construct(ObligacionTributaria $obligacion)
    {
        $this->obligacion = $obligacion;
    }

    public function build()
    {
        return $this->subject('✅ Documento Recibido: ' . $this->cliente->razon_social_nombres)
                    ->view('emails.obligacion_subida');
    }
}