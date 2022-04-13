<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $primaryKey = "id_restaurant";
    public $timestamps = false;
    protected $fillable = ['nom', 'telefon', 'pagina_web', 'ubicacio', 'horari_ca', 'horari_es', 'horari_en', 'horari_de', 'descripcio_ca', 'descripcio_es', 'descripcio_en', 'descripcio_de', 'imatge', 'carta', 'id_tipus'];
    use HasFactory;

    // RELACIONS
    /*protected $with = ["serveis"];

    public function serveis()
    {
        return $this->belongsToMany('App\Models\Servei', "restaurants_serveis", "id_restaurant", "id_servei");
    }*/
}
