<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransportTransportDocumentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('transport_transport_document', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->unsignedInteger('transport_document_id');
          $table->foreign('transport_document_id')->references('id')->on('transport_documents')->onDelete('cascade');
          $table->unsignedInteger('transport_id');
          $table->foreign('transport_id')->references('id')->on('transports')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('transport_transport_document');
    }
}