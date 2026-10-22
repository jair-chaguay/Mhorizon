<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class TrackingController extends Controller 
{
    public function getDashboardData(){
        $leads = DB::table('leads')
                    ->orderBy('updated_at', 'desc')
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
        $fase = $request->query('fase', 1);
        $campaign = $request->query('campaign', 'Campaña General');
        $status = $request->query('status', 'sent');

        
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
                    'fase' => $fase,
                    'status' => $estadoTexto,
                    'opens' => 0,
                    'clicks' => 0,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            } else {
                DB::table('leads')->where('email', $email)->update([
                    'fase' => $fase,
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
                    'event_type' => $status, // 'blocked' o 'failed'
                    'created_at' => now(),
                    'updated_at' => now()
                ]);

                // Retiramos al prospecto de la automatización en la tabla principal del CRM (Fase 99)
                DB::table('leadss')->where('email', $email)->update([
                    'fase' => 99,
                    'status' => "Retirado ($estadoTexto)",
                    'updated_at' => now()
                ]);
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
}