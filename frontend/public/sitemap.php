<?php
header("Content-Type: text/xml; charset=utf-8");
$api_url = "https://api.mhorizon.com.ec/api/sitemap";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
$xml_response = curl_exec($ch);
curl_close($ch);

echo $xml_response;
?>