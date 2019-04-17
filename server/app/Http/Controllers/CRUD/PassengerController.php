<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Passenger;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PassengerController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Passenger::get(),200);
       } else {
          $passenger = Passenger::findOrFail($id);
          $attach = [];
          return response()->json(["Passenger"=>$passenger, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Passenger::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $passenger = new Passenger();
          $lastPassenger = Passenger::orderBy('id')->get()->last();
          if($lastPassenger) {
             $passenger->id = $lastPassenger->id + 1;
          } else {
             $passenger->id = 1;
          }
          $passenger->phone_number = $result['phone_number'];
          $passenger->address_map_latitude = $result['address_map_latitude'];
          $passenger->address_map_longitude = $result['address_map_longitude'];
          $passenger->address = $result['address'];
          $passenger->additional_info = $result['additional_info'];
          $passenger->user_id = $result['user_id'];
          $passenger->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($passenger,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $passenger = Passenger::where('id',$result['id'])->update([
             'phone_number'=>$result['phone_number'],
             'address_map_latitude'=>$result['address_map_latitude'],
             'address_map_longitude'=>$result['address_map_longitude'],
             'address'=>$result['address'],
             'additional_info'=>$result['additional_info'],
             'user_id'=>$result['user_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($passenger,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Passenger::destroy($id);
    }

    function backup(Request $data)
    {
       $passengers = Passenger::get();
       $toReturn = [];
       foreach( $passengers as $passenger) {
          $attach = [];
          array_push($toReturn, ["Passenger"=>$passenger, "attach"=>$attach]);
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
         $result = $row['Passenger'];
         $exist = Passenger::where('id',$result['id'])->first();
         if ($exist) {
           Passenger::where('id', $result['id'])->update([
             'phone_number'=>$result['phone_number'],
             'address_map_latitude'=>$result['address_map_latitude'],
             'address_map_longitude'=>$result['address_map_longitude'],
             'address'=>$result['address'],
             'additional_info'=>$result['additional_info'],
             'user_id'=>$result['user_id'],
           ]);
         } else {
          $passenger = new Passenger();
          $passenger->id = $result['id'];
          $passenger->phone_number = $result['phone_number'];
          $passenger->address_map_latitude = $result['address_map_latitude'];
          $passenger->address_map_longitude = $result['address_map_longitude'];
          $passenger->address = $result['address'];
          $passenger->additional_info = $result['additional_info'];
          $passenger->user_id = $result['user_id'];
          $passenger->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}