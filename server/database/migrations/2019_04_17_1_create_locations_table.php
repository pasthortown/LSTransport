<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('locations', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->float('coords_latitude',24,16)->nullable($value = true);
          $table->float('coords_longitude',24,16)->nullable($value = true);
          $table->dateTime('date_time')->nullable($value = true);
          $table->unsignedInteger('user_id');
          $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('locations');
    }
}