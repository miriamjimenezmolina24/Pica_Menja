<?php

namespace App\Http\Controllers;

use App\Models\Restaurant_Servei;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Restaurant_ServeiController extends Controller
{
    // FUNCIÓ PER BORRAR UN RESTAURANT_SERVEI
    // MÈTODE DELETE
    public function delete($id_restaurant, $id_servei)
    {
        $tupla = Restaurant_Servei::where("id_restaurant", $id_restaurant)->where("id_servei", $id_servei)->delete();
        if ($tupla) {
            return response()->json(["Status" => "Servei del restaurant esborrat correctament"], 200);
        } else {
            return response()->json(["Status" => "Servei del restaurant no trobat."], 404);
        }
    }

    // FUNCIÓ PER CREAR UN RESTAURANT_SERVEI
    // MÈTODE POST
    public function store(Request $request)
    {
        // Validam que les FK id_restaurant i id_servei existeixen
        $validacio = Validator::make($request->all(), [
            'id_restaurant' => 'exists:restaurants,id_restaurant',
            'id_servei' => 'exists:serveis,id_servei'
        ]);
        if (!$validacio->fails()) {
            $tupla = new Restaurant_Servei();
            $tupla->id_restaurant = $request->id_restaurant;
            $tupla->id_servei = $request->id_servei;
            if ($tupla->save()) {
                return response()->json(["Status" => "Restaurant amb servei creat", "Result" => $tupla], 201);
            } else {
                return response()->json(["Status" => "Error creant"], 409);
            }
        } else {
            return response()->json(["Status" => "Error. Restaurant o servei inexistents."], 404);
        }
    }

    /*---FUNCIONS PER FILTRAR PER SERVEIS OFERITS DE CADA RESTAURANT EN CADA IDIOMA---*/

    // FUNCIÓ PER FILTRAR EN CATALÀ
    public function serveisCa($id)
    {
        $resultat = Restaurant_Servei::join("restaurants", "restaurants.id_restaurant", "=", "restaurants_serveis.id_restaurant")
            ->join("serveis", "serveis.id_servei", "=", "restaurants_serveis.id_servei")
            ->select("serveis.servei_ca as servei")
            ->where("restaurants_serveis.id_restaurant", "=", $id)
            ->get();
        return response()->json($resultat);
    }

    // TODO: DEMÁS IDIOMAS

    /*---FUNCIÓ PER FILTRAR RESTAURANTS DONAT UN SERVEI---*/
    public function restaurants($id)
    {
        $resultat = Restaurant_Servei::join("restaurants", "restaurants.id_restaurant", "=", "restaurants_serveis.id_restaurant")
            ->join("serveis", "serveis.id_servei", "=", "restaurants_serveis.id_servei")
            ->select("restaurants.nom as restaurant")
            ->where("restaurants_serveis.id_servei", "=", $id)
            ->get();
        return response()->json($resultat);
    }
}
