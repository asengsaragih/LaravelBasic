<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('dashboard');
});

Route::get('/login', function () {
    return view('login');
});

Route::get('/android', function () {
    return view('android');
});

Route::get('/iot', function () {
    return view('iot');
});

Route::get('/add-user', function () {
    return view('addUser');
});

Route::get('/view-user', function () {
    return view('viewUser');
});
