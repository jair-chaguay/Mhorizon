<?php

namespace App\Mail;

use App\Models\CorreoInformativo;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NuevoCorreoInformativoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $lead; 

    public function __construct(CorreoInformativo $lead)
    {
        $this->lead = $lead;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nuevo registro de boletín / informativo',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.nuevo_registro_informativo', 
        );
    }

    public function attachments(): array
    {
        return [];
    }
}