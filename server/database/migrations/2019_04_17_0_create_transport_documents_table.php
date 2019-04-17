<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransportDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('transport_documents', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('name',50)->nullable($value = true);
          $table->string('code',50)->nullable($value = true);
          $table->dateTime('validity_start')->nullable($value = true);
          $table->dateTime('validity_end')->nullable($value = true);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('transport_documents');
    }
}