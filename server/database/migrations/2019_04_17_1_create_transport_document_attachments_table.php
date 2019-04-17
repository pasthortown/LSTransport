<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransportDocumentAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('transport_document_attachments', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('transport_document_attachment_file_type',50)->nullable($value = true);
          $table->string('transport_document_attachment_file_name',50)->nullable($value = true);
          $table->longText('transport_document_attachment_file')->nullable($value = true);
          $table->unsignedInteger('transport_document_id');
          $table->foreign('transport_document_id')->references('id')->on('transport_documents')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('transport_document_attachments');
    }
}