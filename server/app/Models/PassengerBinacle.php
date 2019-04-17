<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PassengerBinacle extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'time_start','time_end','aboard','address_start_latitude','address_start_longitude','address_end_latitude','address_end_longitude',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Passenger()
    {
       return $this->hasOne('App\Passenger');
    }

    function Binnacles()
    {
       return $this->belongsToMany('App\Binnacle')->withTimestamps();
    }

}