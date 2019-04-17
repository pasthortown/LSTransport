<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePassengerBinaclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('passenger_binacles', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->time('time_start')->nullable($value = true);
          $table->time('time_end')->nullable($value = true);
          $table->boolean('aboard')->nullable($value = true);
          $table->float('address_start_latitude',24,16)->nullable($value = true);
          $table->float('address_start_longitude',24,16)->nullable($value = true);
          $table->float('address_end_latitude',24,16)->nullable($value = true);
          $table->float('address_end_longitude',24,16)->nullable($value = true);
          $table->unsignedInteger('passenger_id');
          $table->foreign('passenger_id')->references('id')->on('passengers')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('passenger_binacles');
    }
}