<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\adminController;


Route::get('/admins', [adminController::class, 'index']);

Route::get('/admins/{id}', function(){

});

Route::post('/admins', [adminController::class, 'store']);

Route::put('/admins/{id}', function(){

});

Route::delete('/admins/{id}', function(){

});