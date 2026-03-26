<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\adminController;
use App\Http\Controllers\Api\suscriptoresController;
use App\Http\Controllers\Api\informativosController;

//LOGIN
Route::post('/login', [adminController::class, 'login']);

//ADMINS
Route::get('/admins', [adminController::class, 'index']);
Route::get('/admins/{id}', [adminController::class, 'show']);
Route::post('/admins', [adminController::class, 'store']);
Route::put('/admins/{id}', [adminController::class, 'update']);
Route::patch('/admins/{id}', [adminController::class, 'updatePartial']);
Route::delete('/admins/{id}', [adminController::class, 'destroy']);

//SUSCRIPTORES
Route::get('/suscriptores', [suscriptoresController::class, 'index']);
Route::get('/suscriptores/{id}', [suscriptoresController::class, 'show']);
Route::post('/suscriptores', [suscriptoresController::class, 'store']);
Route::put('/suscriptores/{id}', [suscriptoresController::class, 'update']);
Route::patch('/suscriptores/{id}', [suscriptoresController::class, 'updatePartial']);
Route::delete('/suscriptores/{id}', [suscriptoresController::class, 'destroy']);

//INFORMATIVOS
Route::get('/informativos', [informativosController::class, 'index']);
Route::get('/informativos/{id}', [informativosController::class, 'show']);
Route::post('/informativos', [informativosController::class, 'store']);
Route::put('/informativos/{id}', [informativosController::class, 'update']);
Route::patch('/informativos/{id}', [informativosController::class, 'updatePartial']);
Route::delete('/informativos/{id}', [informativosController::class, 'destroy']);