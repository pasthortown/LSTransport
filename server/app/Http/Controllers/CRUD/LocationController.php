<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Location;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class LocationController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Location::get(),200);
       } else {
          $location = Location::findOrFail($id);
          $attach = [];
          return response()->json(["Location"=>$location, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Location::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $location = new Location();
          $lastLocation = Location::orderBy('id')->get()->last();
          if($lastLocation) {
             $location->id = $lastLocation->id + 1;
          } else {
             $location->id = 1;
          }
          $location->coords_latitude = $result['coords_latitude'];
          $location->coords_longitude = $result['coords_longitude'];
          $location->date_time = $result['date_time'];
          $location->user_id = $result['user_id'];
          $location->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($location,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $location = Location::where('id',$result['id'])->update([
             'coords_latitude'=>$result['coords_latitude'],
             'coords_longitude'=>$result['coords_longitude'],
             'date_time'=>$result['date_time'],
             'user_id'=>$result['user_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($location,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Location::destroy($id);
    }

    function backup(Request $data)
    {
       $locations = Location::get();
       $toReturn = [];
       foreach( $locations as $location) {
          $attach = [];
          array_push($toReturn, ["Location"=>$location, "attach"=>$attach]);
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
         $result = $row['Location'];
         $exist = Location::where('id',$result['id'])->first();
         if ($exist) {
           Location::where('id', $result['id'])->update([
             'coords_latitude'=>$result['coords_latitude'],
             'coords_longitude'=>$result['coords_longitude'],
             'date_time'=>$result['date_time'],
             'user_id'=>$result['user_id'],
           ]);
         } else {
          $location = new Location();
          $location->id = $result['id'];
          $location->coords_latitude = $result['coords_latitude'];
          $location->coords_longitude = $result['coords_longitude'];
          $location->date_time = $result['date_time'];
          $location->user_id = $result['user_id'];
          $location->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}