<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'detail',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Binnacles()
    {
       return $this->belongsToMany('App\Binnacle')->withTimestamps();
    }

    function User()
    {
       return $this->hasOne('App\User');
    }

    function ReportState()
    {
       return $this->hasOne('App\ReportState');
    }

    function ReportResponses()
    {
       return $this->belongsToMany('App\ReportResponse')->withTimestamps();
    }

}