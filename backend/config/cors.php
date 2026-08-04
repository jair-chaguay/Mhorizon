<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'storage/*' ,'sanctum/csrf-cookie'],

    'allowed_methods' => ['*', 'https://mhorizon.com.ec'],

    'allowed_origins' => [
        'https://api.mhorizon.com.ec',
        'https://experience.mhorizon.com.ec',
        'http://localhost:5173',
        'http://mhorizon.com.ec',
        'https://mhorizon.com.ec',
        'http://localhost:45678'
        ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
