<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Cliente;

class AlertaScoreCliente extends Mailable
{
    use Queueable, SerializesModels;

    public $cliente;
    public $scoreTotal;
    public $detalleRespuestas;

    /**
     * Create a new message instance.
     */
    public function __construct(Cliente $cliente, $scoreTotal, $detalleRespuesta)
    {
        $this->cliente = $cliente;
        $this->scoreTotal = $scoreTotal;
        $this->detalleRespuestas = $detalleRespuesta;
    }

    /**
     * Get the message envelope.
     */
    public function build()
    {
        return $this -> subject('Nueva evaluación de Cliente: ' . $this->cliente->razon_social_nombres)
                    -> view('emails.score_alerta');
    }

    
}
