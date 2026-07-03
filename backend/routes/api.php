<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RolController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\InformativoController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\noticiasController;
use App\Http\Controllers\Api\DeclaracionController;
use App\Http\Controllers\Api\ContactoController;
use App\Http\Controllers\Api\BibliotecaController;

use App\Http\Controller\Api\ContactController;
use App\Http\Controllers\Api\ObligacionController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\CorreoCalculadoraController;
use App\Http\Controllers\Api\PreguntaScoreController;




//LOGIN
Route::post('/login', [AuthController::class, 'login']);

Route::post('/auth/forgot-password', [PasswordResetController::class, 'sendOtp']);
Route::post('/auth/verify-otp', [PasswordResetController::class, 'verifyOtp']);
Route::post('/auth/reset-password', [PasswordResetController::class, 'resetPassword']);

Route::get('/correoC', [CorreoCalculadoraController::class, 'index']);
Route::post('/correoC', [CorreoCalculadoraController::class, 'store']);
Route::get('/correoC/{id}', [CorreoCalculadoraController::class, 'show']);
Route::delete('/correoC/{id}', [CorreoCalculadoraController::class, 'destroy']);



//ROLES
Route::get('/rol', [RolController::class, 'index']);
Route::post('/rol', [RolController::class, 'store']);
Route::get('/rol/{id}', [RolController::class, 'show']);
Route::put('/rol/{id}', [RolController::class, 'update']);
Route::delete('/rol/{id}', [RolController::class, 'destroy']);

//EMPRESAS
Route::get('/cliente', [ClienteController::class, 'index']);
Route::get('/cliente/{id}', [ClienteController::class, 'show']);
Route::delete('/cliente/{id}', [ClienteController::class, 'destroy']);

Route::get('/usuario', [UsuarioController::class, 'index']);
Route::get('/usuario/{id}', [UsuarioController::class, 'show']);
Route::post('/usuario', [UsuarioController::class, 'store']);
Route::put('/usuario/{id}', [UsuarioController::class, 'update']);
Route::delete('/usuario/{id}', [UsuarioController::class, 'destroy']);


Route::middleware('auth:sanctum')->group(function () {
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/cliente', [ClienteController::class, 'store']);

Route::get('/user', function (Request $request) {
        return $request->user();
    });

Route::put('/biblioteca/carpeta/{tipo}/{id}', [BibliotecaController::class, 'updateCarpeta']);
Route::put('/cliente/{id}', [ClienteController::class, 'update']);
Route::get('/cliente/{id}/obligaciones', [ObligacionController::class, 'indexCliente']);
Route::post('/obligacion', [ObligacionController::class, 'store']);
Route::put('/obligacion/{id}/toggle', [ObligacionController::class, 'toggleEstado']);
Route::delete('/obligacion/{id}', [ObligacionController::class, 'destroy']);



Route::get('/preguntas-score', [PreguntaScoreController::class, 'obtenerPreguntas']);
Route::post('/clientes/{id}/evaluar-score', [ClienteController::class, 'evaluarScore']);

Route::post('/informativo', [InformativoController::class, 'store']);
Route::put('/informativo/{id}', [InformativoController::class, 'update']);
Route::delete('/informativo/{id}', [InformativoController::class, 'destroy']);

Route::get('/noticia/{id}', [noticiasController::class, 'show']);
Route::post('/noticia', [noticiasController::class, 'store']);
Route::put('/noticia/{id}', [noticiasController::class, 'update']);
Route::delete('/noticia/{id}', [noticiasController::class, 'destroy']);

Route::get('/contacto', [ContactoController::class, 'index']);
Route::get('/contacto/{id}', [ContactoController::class, 'show']);
Route::put('/contacto/{id}', [ContactoController::class, 'update']);
Route::delete('/contacto/{id}', [ContactoController::class, 'destroy']);


Route::post('/biblioteca/periodo', [BibliotecaController::class, 'storePeriodo']);
Route::post('/biblioteca/subcarpeta', [BibliotecaController::class, 'storeSubcarpeta']);
Route::post('/biblioteca/upload-documento', [BibliotecaController::class, 'uploadDocumento']);
Route::delete('/biblioteca/carpeta/{tipo}/{id}', [BibliotecaController::class, 'deleteCarpeta']);
Route::put('/obligacion/{id}', [ObligacionController::class, 'update']);
Route::post('/informativo/upload-imagen-editor', [InformativoController::class, 'uploadEditorImage']);

Route::get('/clientes/biblioteca', [ClienteController::class, 'indexBiblioteca']);

Route::post('/biblioteca/upload-obligacion', [BibliotecaController::class, 'uploadDocumentoObligacion']);
});

Route::post('/enviar-solicitud', [ContactController::class, 'sendEmail']);

Route::get('/noticia', [noticiasController::class, 'index']);
Route::get('/informativo', [InformativoController::class, 'index']);
Route::get('/informativo/{id}', [InformativoController::class, 'show']);



Route::post('/contacto', [ContactoController::class, 'store']);


Route::get('/biblioteca/arbol/{cliente_id}', [BibliotecaController::class, 'getArbolBiblioteca']);

Route::delete('/deleteDocumento/{id}', [BibliotecaController::class, 'deleteDocumento']);



