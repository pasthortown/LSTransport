<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('transports', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('plate',10)->nullable($value = true);
          $table->string('coorp',20)->nullable($value = true);
          $table->string('code',20)->nullable($value = true);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('transports');
    }
}