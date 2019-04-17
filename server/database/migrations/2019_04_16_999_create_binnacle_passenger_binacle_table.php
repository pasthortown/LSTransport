<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBinnaclePassengerBinacleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('binnacle_passenger_binacle', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->unsignedInteger('passenger_binacle_id');
          $table->foreign('passenger_binacle_id')->references('id')->on('passenger_binacles')->onDelete('cascade');
          $table->unsignedInteger('binnacle_id');
          $table->foreign('binnacle_id')->references('id')->on('binnacles')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('binnacle_passenger_binacle');
    }
}