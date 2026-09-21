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

        return response()->json($leads);
    }
    public function trackOpen(Request $request)
    {
        $email = $request->query('email');
        if($email){
            DB::table('leads')
            ->where('email', $email)
            ->increment('opens', 1, ['updated_at' => now()]);
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

        if ($email){
            DB::table('leads')
                ->where('email', $email)
                ->increment('clicks', 1, ['updated_at' => now()]);
        }

        return redirect()->away($targetUrl);
        
    }
}