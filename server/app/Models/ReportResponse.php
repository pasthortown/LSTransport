<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReportResponse extends Model
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

    function User()
    {
       return $this->hasOne('App\User');
    }

    function Reports()
    {
       return $this->belongsToMany('App\Report')->withTimestamps();
    }

}