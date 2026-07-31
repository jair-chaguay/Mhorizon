<?php
namespace App\Http\Controllers\Api;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;

class MailController extends Controller
{
    public function enviarFactura(Request $request) {
    // 1. Validamos los datos que llegan desde Visual FoxPro
    $datos = $request->validate([
        'destinatario' => 'required|email',
        'asunto'       => 'required|string',
        'cuerpo'       => 'required|string',
        'pdf_base64'   => 'required|string',
        'xml_base64'   => 'required|string'
    ]);

    // 2. Creamos una configuración de correo "al vuelo" solo para este proceso
    // Usamos el host de GoDaddy/tu IP y el puerto seguro 465
    Config::set('mail.mailers.smtp_facturacion', [
        'transport'  => 'smtp',
        'host'       => 'mail.mhorizon.com.ec', 
        'port'       => 465,
        'encryption' => 'ssl',
        'username'   => 'facturacion@mhorizon.com.ec',
        'password'   => 'AQUI_VA_LA_CONTRASEÑA_DE_FACTURACION', 
        'timeout'    => null,
    ]);

    // 3. Le decimos a Laravel que use ESA configuración específica ('smtp_facturacion')
    Mail::mailer('smtp_facturacion')->raw($datos['cuerpo'], function ($message) use ($datos) {
        
        // Forzamos el remitente para que no use el del .env
        $message->from('facturacion@mhorizon.com.ec', 'MHORIZON ECUADOR S.A.');
        
        $message->to($datos['destinatario'])
                ->subject($datos['asunto']);

        // Decodificamos el Base64 que manda FoxPro y lo adjuntamos
        $message->attachData(base64_decode($datos['pdf_base64']), 'factura.pdf', [
            'mime' => 'application/pdf',
        ]);
        $message->attachData(base64_decode($datos['xml_base64']), 'factura.xml', [
            'mime' => 'application/xml',
        ]);
    });

    return response()->json(['status' => 'success', 'message' => 'Factura enviada exitosamente']);
}
}
