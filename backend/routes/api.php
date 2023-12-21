<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\TaskController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::post('/addTask', [TaskController::class, 'addTask']);
Route::delete('/deleteTask/{id}', [TaskController::class, 'deleteTask']);
Route::post('/updateTask/{id}', [TaskController::class, 'updateTask']);
