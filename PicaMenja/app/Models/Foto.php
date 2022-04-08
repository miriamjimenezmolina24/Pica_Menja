<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foto extends Model
{
    protected $primaryKey = ["id_restaurant", "id_foto"];
    protected $fillable = ["id_restaurant", "id_foto", "foto"];
    public $timestamps = false;
    use HasFactory;
}
