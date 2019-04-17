<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBinnacleReportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('binnacle_report', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->unsignedInteger('report_id');
          $table->foreign('report_id')->references('id')->on('reports')->onDelete('cascade');
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
       Schema::dropIfExists('binnacle_report');
    }
}