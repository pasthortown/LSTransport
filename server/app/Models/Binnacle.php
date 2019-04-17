<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Binnacle extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'start','end','address_start_map_latitude','address_start_map_longitude','address_end_map_latitude','address_end_map_longitude','address_start','address_end','oddometer_start','oddometer_end',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Transport()
    {
       return $this->hasOne('App\Transport');
    }

    function PassengerBinacles()
    {
       return $this->belongsToMany('App\PassengerBinacle')->withTimestamps();
    }

    function Route()
    {
       return $this->hasOne('App\Route');
    }

    function Driver()
    {
       return $this->hasOne('App\Driver');
    }

    function Reports()
    {
       return $this->belongsToMany('App\Report')->withTimestamps();
    }

}