<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransportPicture extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'transport_picture_file_type','transport_picture_file_name','transport_picture_file',
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

}