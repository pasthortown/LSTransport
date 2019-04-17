<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransportPicturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('transport_pictures', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('transport_picture_file_type',50)->nullable($value = true);
          $table->string('transport_picture_file_name',50)->nullable($value = true);
          $table->longText('transport_picture_file')->nullable($value = true);
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
       Schema::dropIfExists('transport_pictures');
    }
}