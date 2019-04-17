<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransportDocumentAttachment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'transport_document_attachment_file_type','transport_document_attachment_file_name','transport_document_attachment_file',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function TransportDocument()
    {
       return $this->hasOne('App\TransportDocument');
    }

}