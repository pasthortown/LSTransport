<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransportDocument extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'name','code','validity_start','validity_end',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function TransportDocumentAttachment()
    {
       return $this->belongsTo('App\TransportDocumentAttachment');
    }

    function Transports()
    {
       return $this->belongsToMany('App\Transport')->withTimestamps();
    }

}