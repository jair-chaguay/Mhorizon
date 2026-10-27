<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class TrackingController extends Controller 
{
    public function getDashboardData(){
        // El estado que se muestra es el del CRM (leadss): ahí el agente IMAP marca quién respondió.
        // tracking_status conserva el de esta tabla (Contactado / Bloqueado / Falló)
        $leads = DB::table('leads')
                    ->leftJoin('leadss as crm', 'crm.email', '=', 'leads.email')
                    ->select(
                        'leads.id', 'leads.email', 'leads.fase', 'leads.sent', 'leads.delivered', 'leads.blocked', 'leads.failed',
                        'leads.spam', 'leads.unsubscribed', 'leads.opens', 'leads.clicks', 'leads.created_at', 'leads.updated_at',
                        'leads.status as tracking_status',
                        DB::raw('COALESCE(crm.status, leads.status) as status'),
                        'crm.nombre', 'crm.empresa', 'crm.telefono', 'crm.responsable', 'crm.proxima_accion', 'crm.proxima_fecha'
                    )
                    ->orderBy('leads.updated_at', 'desc')
                    ->get();
        $linkClicks = DB::table('link_clicks')->get();
        $emailLogs = DB::table('email_logs')->orderBy('created_at', 'asc')->get();

        return response()->json([
            'leads'=>$leads,
            'email_logs'=>$emailLogs,
            'link_clicks' =>$linkClicks
        ]);
    }

    public function registerLead(Request $request){
        $email = $request->query('email');
        // Los rebotes leídos por IMAP llegan sin fase: en ese caso no se cambia la que ya tiene
        $fase = $request->query('fase');
        // Sin campaña (por ejemplo, un rebote detectado por IMAP) se usa la del último envío a ese correo
        $campaign = $request->query('campaign');
        $status = $request->query('status', 'sent');
        $reason = $request->query('reason');


        if($email) {

            if (!$campaign) {
                $ultimoLog = DB::table('email_logs')
                    ->where('email', $email)
                    ->where('event_type', 'sent')
                    ->orderBy('id', 'desc')
                    ->first();
                $campaignName = $ultimoLog ? $ultimoLog->campaign_name : 'Campaña General';
            } else {
                $campaignName = urldecode($campaign);
            }


            $estadoTexto = $status === 'sent' ? 'Contactado' : ($status === 'blocked' ? 'Bloqueado' : 'Falló');

            $lead = DB::table('leads')->where('email', $email)->first();
            if (!$lead) {
                DB::table('leads')->insert([
                    'email' => $email,
                    'fase' => $fase ?? 1,
                    'status' => $estadoTexto,
                    'opens' => 0,
                    'clicks' => 0,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            } else {
                DB::table('leads')->where('email', $email)->update(($fase !== null ? ['fase' => $fase] : []) + [
                    'status'=> $estadoTexto,
                    'updated_at' => now()
                ]);
            }

            if ($status === 'sent') {
                DB::table('email_logs')->insert([
                    'email' => $email,
                    'campaign_name' => $campaignName,
                    'event_type' => 'sent',
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            } else {
                $existeSent = DB::table('email_logs')
                    ->where('email', $email)
                    ->where('campaign_name', $campaignName)
                    ->where('event_type', 'sent')
                    ->exists();

                if (!$existeSent) {
                    DB::table('email_logs')->insert([
                        'email' => $email,
                        'campaign_name' => $campaignName,
                        'event_type' => 'sent',
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);
                }

                // Registramos el evento de bloqueo o fallo para que el Dashboard lo pinte
                DB::table('email_logs')->insert([
                    'email' => $email,
                    'campaign_name' => $campaignName,
                    'event_type' => $status, // 'blocked' (rebote duro) o 'failed' (rebote suave)
                    'bounce_reason' => $reason ? mb_substr($reason, 0, 1000) : null,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                // Rebote duro: se retira al prospecto de la automatización (Fase 99).
                // Rebote suave: sigue en su fase; el worker no contó el envío y lo reintenta en el próximo lote
                if ($status === 'blocked') {
                    DB::table('leadss')->where('email', $email)->update([
                        'fase' => 99,
                        'status' => "Retirado ($estadoTexto)",
                        'updated_at' => now()
                    ]);
                }
            }

        }
        return response()->json(['message' => 'Registrado correctamente']);
    }



    public function trackOpen(Request $request)
    {
        $email = $request->query('email');
        $campaign = $request->query('campaign', 'Campaña General');
        $userAgent = $request->header('User-Agent');

        if($email){
            DB::table('leads')
            ->where('email', $email)
            ->increment('opens', 1, ['updated_at' => now()]);

            DB::table('email_logs')->insert([
                'email'=>$email,
                'campaign_name'=>urldecode($campaign),
                'event_type' =>'open',
                'user_agent'=>$userAgent,
                'created_at' =>now(),
                'updated_at' => now()
            ]);
        }

        $pixel = base64_decode('R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==');
        
        return response($pixel)
            ->header('Content-Type', 'image/gif')
            ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            ->header('Pragma', 'no-cache')
            ->header('Expires', '0');
    }

    public function trackClick(Request $request){
        $email = $request->query('email');
        $targetUrl = $request->query('url', 'https://mhorizon.com.ec');
        $campaign = $request->query('campaign', 'Campaña General');
        $userAgent = $request->header('User-Agent');

        if ($email){
            DB::table('leads')
                ->where('email', $email)
                ->increment('clicks', 1, ['updated_at' => now()]);

            DB::table('link_clicks')->insert([
                'email' => $email,
                'url' => urldecode($targetUrl),
                'created_at' => now(),
                'updated_at' => now()
            ]);


            DB::table('email_logs')->insert([
                'email'=>$email,
                'campaign_name'=>urldecode($campaign),
                'event_type'=>'click',
                'url'=>urldecode($targetUrl),
                'user_agent'=>$userAgent,
                'created_at'=>now(),
                'updated_at' => now()
            ]);
        }

        return redirect()->away($targetUrl);

    }

    // Enlace "Darse de baja" del pie de los correos. El GET solo muestra la confirmación
    // (los antivirus de correo abren los enlaces solos); la baja se registra con el POST del botón
    public function unsubscribe(Request $request){
        $email = trim((string) $request->input('email'));
        $campaign = $request->input('campaign');

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return response($this->unsubscribePage('Enlace no válido', 'No pudimos identificar tu correo.'), 400);
        }

        if ($request->isMethod('get')) {
            $form = '<form method="POST"><input type="hidden" name="email" value="' . e($email) . '">'
                . '<input type="hidden" name="campaign" value="' . e((string) $campaign) . '">'
                . '<button type="submit">Confirmar baja</button></form>';
            return response($this->unsubscribePage('¿Dejar de recibir nuestros correos?', 'Correo: <strong>' . e($email) . '</strong>', $form));
        }

        $yaRegistrado = DB::table('email_logs')->where('email', $email)->where('event_type', 'unsubscribe')->exists();
        if (!$yaRegistrado) {
            if (!$campaign) {
                $ultimoLog = DB::table('email_logs')->where('email', $email)->where('event_type', 'sent')->orderBy('id', 'desc')->first();
                $campaign = $ultimoLog ? $ultimoLog->campaign_name : 'Campaña General';
            }
            DB::table('email_logs')->insert([
                'email' => $email,
                'campaign_name' => urldecode($campaign),
                'event_type' => 'unsubscribe',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        // Mismo estado que usa el agente IMAP cuando alguien pide no ser contactado
        DB::table('leadss')->where('email', $email)->update([
            'fase' => 99,
            'status' => 'NO CONTACTAR',
            'updated_at' => now()
        ]);

        return response($this->unsubscribePage('Listo, te dimos de baja', 'No volverás a recibir correos de MHORIZON en <strong>' . e($email) . '</strong>.'));
    }

    private function unsubscribePage($titulo, $texto, $extra = ''){
        return '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
            . '<title>MHORIZON</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f4f5f7;font-family:system-ui,sans-serif;color:#1e293b}'
            . '.card{max-width:420px;margin:16px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:28px;text-align:center}'
            . 'h1{font-size:20px;margin:0 0 8px}p{color:#475569;font-size:15px}button{margin-top:12px;height:42px;padding:0 20px;border:0;border-radius:8px;background:#d4681c;color:#fff;font-weight:600;font-size:15px;cursor:pointer}</style></head>'
            . '<body><div class="card"><h1>' . e($titulo) . '</h1><p>' . $texto . '</p>' . $extra . '</div></body></html>';
    }
}