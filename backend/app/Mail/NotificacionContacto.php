<?php

namespace App\Mail;

use App\Models\MensajeContacto;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class NotificacionContacto extends Mailable
{
    use Queueable, SerializesModels;

    public $mensajeContacto;

    /**
     * Create a new message instance.
     */
    public function __construct(MensajeContacto $mensajeContacto)
    {
        $this->mensajeContacto = $mensajeContacto;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('informativo@mhorizon.com.ec', 'Gestor Tributario'),
            subject: 'Nuevo prospecto: ' . $this->mensajeContacto->nombre . ' ' . $this->mensajeContacto->apellido,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.nuevo_contacto', 
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}