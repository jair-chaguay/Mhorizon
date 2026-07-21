<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class NotificacionMembresia extends Mailable
{
    use Queueable, SerializesModels;
    public $datos;

    /**
     * Create a new message instance.
     */
    public function __construct($datos)
    {
        $this-> datos = $datos;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
         return new Envelope(
            from: new Address('informativo@mhorizon.com.ec', 'Gestor Tributario'),
            subject: 'Nueva Solicitud de Membresía: ' . $this->datos['nombre'],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.nueva_membresia'
        );
    }


    public function attachments(): array
    {
        return [];
    }
}
