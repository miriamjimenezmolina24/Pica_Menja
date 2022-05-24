<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\Routing\RouteCompiler;

/* 
|-------------------------------------------------------------------------|
|                           RUTES DE LA API                               |
|-------------------------------------------------------------------------|
*/

///////////////// SENSE AUTENTIFICACIÓ /////////////////

// RUTES DE FRONTEND
// LOGIN A L'API
Route::post('login', 'App\Http\Controllers\LoginController@login');

// REGISTRE D'USUARIS NOUS
Route::post('usuaris', 'App\Http\Controllers\UsuariController@store');

// CARREGAR INFORMACIÓ DELS RESTAURANTS
Route::get('restaurants', 'App\Http\Controllers\RestaurantController@index');
Route::get('restaurants/front', 'App\Http\Controllers\RestaurantController@indexFront');
Route::get('restaurants/{id}', 'App\Http\Controllers\RestaurantController@show');
Route::get('restaurants/tipusCa/{id}', 'App\Http\Controllers\RestaurantController@tipusCa');

// CARREGAR ELS TIPUS DE RESTAURANTS
Route::get('tipus', 'App\Http\Controllers\TipusController@index');

// CARREGAR FOTOS DELS RESTAURANTS
Route::get('fotos/restaurant/{id}', 'App\Http\Controllers\FotoController@fotosRestaurant');

// FILTRAR PER RANG DE PREUS
Route::get('restaurants/rang/{rang}', 'App\Http\Controllers\RestaurantController@rangPreus');

// VALORACIONS I COMENTARIS DELS RESTAURANTS
Route::get('valoracions/restaurant/{id}', 'App\Http\Controllers\ValoracioController@valoracions');
Route::get('valoracions/mitjana/restaurant/{id}', 'App\Http\Controllers\ValoracioController@valoracioMitjana');
Route::get('comentaris/restaurant/{id}', 'App\Http\Controllers\ComentariController@comentaris');


///////////////// AMB AUTENTIFICACIÓ /////////////////

// RUTES DE BACKEND
Route::group(['middleware' => 'token'], function () {
    Route::post('logout', 'App\Http\Controllers\LoginController@logout');

    // RUTES DE LA TAULA COMENTARIS
    Route::group(
        ["prefix" => "comentaris"],
        function () {
            Route::get('', 'App\Http\Controllers\ComentariController@index');
            Route::get('{id}', 'App\Http\Controllers\ComentariController@show');
            Route::delete('{id}', 'App\Http\Controllers\ComentariController@delete');
            Route::post('', 'App\Http\Controllers\ComentariController@store');
            Route::put('{id}', 'App\Http\Controllers\ComentariController@update');
        }
    );

    // RUTES DE LA TAULA FOTOS
    Route::group(
        ["prefix" => "fotos"],
        function () {
            Route::get('', 'App\Http\Controllers\FotoController@index');
            Route::get('{id}', 'App\Http\Controllers\FotoController@show');
            Route::delete('{id}', 'App\Http\Controllers\FotoController@delete');
            Route::post('', 'App\Http\Controllers\FotoController@store');
            Route::post('imatge/{id}', 'App\Http\Controllers\FotoController@pujarFotos');
        }
    );

    // RUTES DE LA TAULA IDIOMES
    Route::group(
        ["prefix" => "idiomes"],
        function () {
            Route::get('', 'App\Http\Controllers\IdiomaController@index');
            Route::get('{id}', 'App\Http\Controllers\IdiomaController@show');
            Route::post('', 'App\Http\Controllers\IdiomaController@store');
        }
    );

    // RUTES DE LA TAULA RESTAURANTS
    Route::group(
        ['prefix' => 'restaurants'],
        function () {
            Route::delete('{id}', 'App\Http\Controllers\RestaurantController@delete');
            Route::post('', 'App\Http\Controllers\RestaurantController@store');
            Route::put('{id}', 'App\Http\Controllers\RestaurantController@update');
            Route::post('imatge/{id}', 'App\Http\Controllers\RestaurantController@imatge');
            Route::get('tipusEs/{id}', 'App\Http\Controllers\RestaurantController@tipusEs');
            Route::get('tipusEn/{id}', 'App\Http\Controllers\RestaurantController@tipusEn');
            Route::get('tipusDe/{id}', 'App\Http\Controllers\RestaurantController@tipusDe');
            Route::post('carta/{id}', 'App\Http\Controllers\RestaurantController@carta');
        }
    );

    // RUTES DE LA TAULA RESTAURANTS_SERVEIS
    Route::group(
        ['prefix' => 'restaurants_serveis'],
        function () {
            Route::get('', 'App\Http\Controllers\Restaurant_ServeiController@index');
            Route::post('', 'App\Http\Controllers\Restaurant_ServeiController@store');
            Route::delete('/{id_restaurant}/{id_servei}', 'App\Http\Controllers\Restaurant_ServeiController@delete');
            Route::get('serveisCa/{id}', 'App\Http\Controllers\Restaurant_ServeiController@serveisCa');
            Route::get('serveisEs/{id}', 'App\Http\Controllers\Restaurant_ServeiController@serveisEs');
            Route::get('serveisEn/{id}', 'App\Http\Controllers\Restaurant_ServeiController@serveisEn');
            Route::get('serveisDe/{id}', 'App\Http\Controllers\Restaurant_ServeiController@serveisDe');
            Route::get('restaurants/{id}', 'App\Http\Controllers\Restaurant_ServeiController@restaurants');
        }
    );

    // RUTES DE LA TAULA SERVEIS
    Route::group(['prefix' => 'serveis'], function () {
        Route::get('', 'App\Http\Controllers\ServeiController@index');
        Route::get('{id}', 'App\Http\Controllers\ServeiController@show');
        Route::delete('{id}', 'App\Http\Controllers\ServeiController@delete');
        Route::post('', 'App\Http\Controllers\ServeiController@store');
    });

    // RUTES DE LA TAULA TIPUS
    Route::group(['prefix' => 'tipus'], function () {
        Route::get('{id}', 'App\Http\Controllers\TipusController@show');
        Route::delete('{id}', 'App\Http\Controllers\TipusController@delete');
        Route::post('', 'App\Http\Controllers\TipusController@store');
    });

    // RUTES DE LA TAULA TRADUCCIONS
    Route::group(['prefix' => 'traduccions'], function () {
        Route::get('', 'App\Http\Controllers\TraduccioController@index');
        Route::get('{id}', 'App\Http\Controllers\TraduccioController@show');
        Route::delete('{id}', 'App\Http\Controllers\TraduccioController@delete');
        Route::post('', 'App\Http\Controllers\TraduccioController@store');
    });

    // RUTES DE LA TAULA USUARIS
    Route::group(['prefix' => 'usuaris'], function () {
        Route::get('', 'App\Http\Controllers\UsuariController@index');
        Route::get('{id}', 'App\Http\Controllers\UsuariController@show');
        Route::delete('{id}', 'App\Http\Controllers\UsuariController@delete');
        Route::put('{id}', 'App\Http\Controllers\UsuariController@update');
        Route::post('foto/{id}', 'App\Http\Controllers\UsuariController@fotoPerfil');
        Route::put('', 'App\Http\Controllers\UsuariController@canviPassword');
    });

    // RUTES DE LA TAULA VALORACIONS
    Route::group(['prefix' => 'valoracions'], function () {
        Route::get('', 'App\Http\Controllers\ValoracioController@index');
        Route::get('{id}', 'App\Http\Controllers\ValoracioController@show');
        Route::delete('{id}', 'App\Http\Controllers\ValoracioController@delete');
        Route::post('', 'App\Http\Controllers\ValoracioController@store');
    });
});