<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class ResultadosCalculadoraMail extends Mailable
{
    public $registro;
    public $resultados;

    public function __construct($registro, $resultados)
    {
        $this->registro = $registro;
        $this->resultados = $resultados;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Tu reporte de cálculo tributario',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.resultados.calculadora',
            with: [
                'registro' => $this->registro,
                'resultados' => $this->resultados
            ],
        );
    }
}