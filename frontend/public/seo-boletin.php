<?php
$boletin_id = isset($_GET['id']) ? $_GET['id'] : null;

$html = file_get_contents('index.html');

if ($boletin_id){
    $api_url = "https://api.mhorizon.com.ec/api/informativo/" . $boletin_id;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3);
    $response = curl_exec($ch);
    curl_close($ch);

    if($response){
        $data = json_decode($response, true);
        $info = isset($data['informativo']) ? $data['informativo'] : $data;

        if(isset($info['titulo'])){
            $titulo_seo = htmlspecialchars($info['titulo']) . " | MHORIZON";

            $titulo_seo = htmlspecialchars($info['titulo']) . " | MHORIZON";
            $desc_seo = htmlspecialchars($info['descripcion_portada']);
            $imagen_seo = isset($info['imagen_portada_url']) && $info['imagen_portada_url'] != null 
                ? "https://api.mhorizon.com.ec/" . ltrim($info['imagen_portada_url'], '/') 
                : "https://mhorizon.com.ec/images/ISOTIPO.png"; // Imagen por defecto
            
            $url_actual = "https://mhorizon.com.ec/novedades-sub/" . $boletin_id;
            
            // 5. Inyectamos la etiqueta "description" que Google necesita y las de redes sociales
            $etiquetas_dinamicas = "
                <title>{$titulo_seo}</title>
                <meta name='description' content='{$desc_seo}' />
                <meta property='og:title' content='{$titulo_seo}' />
                <meta property='og:description' content='{$desc_seo}' />
                <meta property='og:image' content='{$imagen_seo}' />
                <meta property='og:url' content='{$url_actual}' />
                <meta property='og:type' content='article' />
            ";
            
            // 6. Reemplazamos el título genérico por nuestras etiquetas dinámicas
            $html = str_replace('<title>MHORIZON</title>', $etiquetas_dinamicas, $html);
        }
    }
}

// 7. Entregamos la página con las etiquetas listas para Googlebot y para que React inicie
echo $html;
?>