<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBinnaclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('binnacles', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->dateTime('start')->nullable($value = true);
          $table->dateTime('end')->nullable($value = true);
          $table->float('address_start_map_latitude',24,16)->nullable($value = true);
          $table->float('address_start_map_longitude',24,16)->nullable($value = true);
          $table->float('address_end_map_latitude',24,16)->nullable($value = true);
          $table->float('address_end_map_longitude',24,16)->nullable($value = true);
          $table->string('address_start',1024)->nullable($value = true);
          $table->string('address_end',1024)->nullable($value = true);
          $table->double('oddometer_start',8,2)->nullable($value = true);
          $table->double('oddometer_end',8,2)->nullable($value = true);
          $table->unsignedInteger('transport_id');
          $table->foreign('transport_id')->references('id')->on('transports')->onDelete('cascade');
          $table->unsignedInteger('route_id');
          $table->foreign('route_id')->references('id')->on('routes')->onDelete('cascade');
          $table->unsignedInteger('driver_id');
          $table->foreign('driver_id')->references('id')->on('drivers')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('binnacles');
    }
}