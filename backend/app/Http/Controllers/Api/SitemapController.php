<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Informativo;

class SitemapController extends Controller
{
    public function index()
    {
        $informativos = Informativo::orderBy('created_at', 'desc')->get();
        
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        
        $estaticas = ['/', '/soluciones', '/sectores', '/novedades', '/nosotros', '/calculadora'];
        foreach ($estaticas as $ruta) {
            $xml .= '<url><loc>https://mhorizon.com.ec' . $ruta . '</loc><priority>0.80</priority></url>';
        }

        foreach ($informativos as $info) {
            $xml .= '<url>';
            $xml .= '<loc>https://mhorizon.com.ec/novedades-sub/' . $info->id . '</loc>';
            $xml .= '<lastmod>' . $info->updated_at->tz('UTC')->toAtomString() . '</lastmod>';
            $xml .= '<priority>0.90</priority>';
            $xml .= '</url>';
        }
        
        $xml .= '</urlset>';
        return response($xml, 200)->header('Content-Type', 'text/xml');
    }
}