<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReportState extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'name',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function Report()
    {
       return $this->belongsTo('App\Report');
    }

}