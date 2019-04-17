<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePassengersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('passengers', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('phone_number',10)->nullable($value = true);
          $table->float('address_map_latitude',24,16)->nullable($value = true);
          $table->float('address_map_longitude',24,16)->nullable($value = true);
          $table->string('address',1024)->nullable($value = true);
          $table->longText('additional_info')->nullable($value = true);
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
       Schema::dropIfExists('passengers');
    }
}