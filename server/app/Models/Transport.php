<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transport extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'plate',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function TransportPicture()
    {
       return $this->belongsTo('App\TransportPicture');
    }

    function TransportDocuments()
    {
       return $this->belongsToMany('App\TransportDocument')->withTimestamps();
    }

    function Binnacle()
    {
       return $this->belongsTo('App\Binnacle');
    }

}