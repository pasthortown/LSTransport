<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Route;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RouteController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Route::get(),200);
       } else {
          $route = Route::findOrFail($id);
          $attach = [];
          return response()->json(["Route"=>$route, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Route::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $route = new Route();
          $lastRoute = Route::orderBy('id')->get()->last();
          if($lastRoute) {
             $route->id = $lastRoute->id + 1;
          } else {
             $route->id = 1;
          }
          $route->name = $result['name'];
          $route->description = $result['description'];
          $route->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($route,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $route = Route::where('id',$result['id'])->update([
             'name'=>$result['name'],
             'description'=>$result['description'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($route,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Route::destroy($id);
    }

    function backup(Request $data)
    {
       $routes = Route::get();
       $toReturn = [];
       foreach( $routes as $route) {
          $attach = [];
          array_push($toReturn, ["Route"=>$route, "attach"=>$attach]);
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
         $result = $row['Route'];
         $exist = Route::where('id',$result['id'])->first();
         if ($exist) {
           Route::where('id', $result['id'])->update([
             'name'=>$result['name'],
             'description'=>$result['description'],
           ]);
         } else {
          $route = new Route();
          $route->id = $result['id'];
          $route->name = $result['name'];
          $route->description = $result['description'];
          $route->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}