<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Driver;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DriverController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Driver::get(),200);
       } else {
          $driver = Driver::findOrFail($id);
          $attach = [];
          return response()->json(["Driver"=>$driver, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Driver::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $driver = new Driver();
          $lastDriver = Driver::orderBy('id')->get()->last();
          if($lastDriver) {
             $driver->id = $lastDriver->id + 1;
          } else {
             $driver->id = 1;
          }
          $driver->phone_number = $result['phone_number'];
          $driver->user_id = $result['user_id'];
          $driver->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($driver,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $driver = Driver::where('id',$result['id'])->update([
             'phone_number'=>$result['phone_number'],
             'user_id'=>$result['user_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($driver,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Driver::destroy($id);
    }

    function backup(Request $data)
    {
       $drivers = Driver::get();
       $toReturn = [];
       foreach( $drivers as $driver) {
          $attach = [];
          array_push($toReturn, ["Driver"=>$driver, "attach"=>$attach]);
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
         $result = $row['Driver'];
         $exist = Driver::where('id',$result['id'])->first();
         if ($exist) {
           Driver::where('id', $result['id'])->update([
             'phone_number'=>$result['phone_number'],
             'user_id'=>$result['user_id'],
           ]);
         } else {
          $driver = new Driver();
          $driver->id = $result['id'];
          $driver->phone_number = $result['phone_number'];
          $driver->user_id = $result['user_id'];
          $driver->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}