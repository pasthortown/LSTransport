<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\PassengerBinacle;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PassengerBinacleController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(PassengerBinacle::get(),200);
       } else {
          $passengerbinacle = PassengerBinacle::findOrFail($id);
          $attach = [];
          return response()->json(["PassengerBinacle"=>$passengerbinacle, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(PassengerBinacle::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $passengerbinacle = new PassengerBinacle();
          $lastPassengerBinacle = PassengerBinacle::orderBy('id')->get()->last();
          if($lastPassengerBinacle) {
             $passengerbinacle->id = $lastPassengerBinacle->id + 1;
          } else {
             $passengerbinacle->id = 1;
          }
          $passengerbinacle->time_start = $result['time_start'];
          $passengerbinacle->time_end = $result['time_end'];
          $passengerbinacle->aboard = $result['aboard'];
          $passengerbinacle->address_start_latitude = $result['address_start_latitude'];
          $passengerbinacle->address_start_longitude = $result['address_start_longitude'];
          $passengerbinacle->address_end_latitude = $result['address_end_latitude'];
          $passengerbinacle->address_end_longitude = $result['address_end_longitude'];
          $passengerbinacle->passenger_id = $result['passenger_id'];
          $passengerbinacle->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($passengerbinacle,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $passengerbinacle = PassengerBinacle::where('id',$result['id'])->update([
             'time_start'=>$result['time_start'],
             'time_end'=>$result['time_end'],
             'aboard'=>$result['aboard'],
             'address_start_latitude'=>$result['address_start_latitude'],
             'address_start_longitude'=>$result['address_start_longitude'],
             'address_end_latitude'=>$result['address_end_latitude'],
             'address_end_longitude'=>$result['address_end_longitude'],
             'passenger_id'=>$result['passenger_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($passengerbinacle,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return PassengerBinacle::destroy($id);
    }

    function backup(Request $data)
    {
       $passengerbinacles = PassengerBinacle::get();
       $toReturn = [];
       foreach( $passengerbinacles as $passengerbinacle) {
          $attach = [];
          array_push($toReturn, ["PassengerBinacle"=>$passengerbinacle, "attach"=>$attach]);
       }
       return response()->json($toReturn,200);
    }

    function masiveLoad(Request $data)
    {
      $incomming = $data->json()->all();
      $masiveData = $incomming['data'];
      try{
       DB::beginTransaction();
       foreach($masiveData as $row) {
         $result = $row['PassengerBinacle'];
         $exist = PassengerBinacle::where('id',$result['id'])->first();
         if ($exist) {
           PassengerBinacle::where('id', $result['id'])->update([
             'time_start'=>$result['time_start'],
             'time_end'=>$result['time_end'],
             'aboard'=>$result['aboard'],
             'address_start_latitude'=>$result['address_start_latitude'],
             'address_start_longitude'=>$result['address_start_longitude'],
             'address_end_latitude'=>$result['address_end_latitude'],
             'address_end_longitude'=>$result['address_end_longitude'],
             'passenger_id'=>$result['passenger_id'],
           ]);
         } else {
          $passengerbinacle = new PassengerBinacle();
          $passengerbinacle->id = $result['id'];
          $passengerbinacle->time_start = $result['time_start'];
          $passengerbinacle->time_end = $result['time_end'];
          $passengerbinacle->aboard = $result['aboard'];
          $passengerbinacle->address_start_latitude = $result['address_start_latitude'];
          $passengerbinacle->address_start_longitude = $result['address_start_longitude'];
          $passengerbinacle->address_end_latitude = $result['address_end_latitude'];
          $passengerbinacle->address_end_longitude = $result['address_end_longitude'];
          $passengerbinacle->passenger_id = $result['passenger_id'];
          $passengerbinacle->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}