<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'phone_number','address_map_latitude','address_map_longitude','address','additional_info',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function User()
    {
       return $this->hasOne('App\User');
    }

    function PassengerBinacle()
    {
       return $this->belongsTo('App\PassengerBinacle');
    }

}