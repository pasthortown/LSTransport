<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Binnacle;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BinnacleController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Binnacle::get(),200);
       } else {
          $binnacle = Binnacle::findOrFail($id);
          $attach = [];
          $passenger_binacles_on_binnacle = $binnacle->PassengerBinacles()->get();
          array_push($attach, ["passenger_binacles_on_binnacle"=>$passenger_binacles_on_binnacle]);
          $reports_on_binnacle = $binnacle->Reports()->get();
          array_push($attach, ["reports_on_binnacle"=>$reports_on_binnacle]);
          return response()->json(["Binnacle"=>$binnacle, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Binnacle::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $binnacle = new Binnacle();
          $lastBinnacle = Binnacle::orderBy('id')->get()->last();
          if($lastBinnacle) {
             $binnacle->id = $lastBinnacle->id + 1;
          } else {
             $binnacle->id = 1;
          }
          $binnacle->start = $result['start'];
          $binnacle->end = $result['end'];
          $binnacle->address_start_map_latitude = $result['address_start_map_latitude'];
          $binnacle->address_start_map_longitude = $result['address_start_map_longitude'];
          $binnacle->address_end_map_latitude = $result['address_end_map_latitude'];
          $binnacle->address_end_map_longitude = $result['address_end_map_longitude'];
          $binnacle->address_start = $result['address_start'];
          $binnacle->address_end = $result['address_end'];
          $binnacle->oddometer_start = $result['oddometer_start'];
          $binnacle->oddometer_end = $result['oddometer_end'];
          $binnacle->price = $result['price'];
          $binnacle->transport_id = $result['transport_id'];
          $binnacle->route_id = $result['route_id'];
          $binnacle->driver_id = $result['driver_id'];
          $binnacle->save();
          $passenger_binacles_on_binnacle = $result['passenger_binacles_on_binnacle'];
          foreach( $passenger_binacles_on_binnacle as $passenger_binacle) {
             $binnacle->PassengerBinacles()->attach($passenger_binacle['id']);
          }
          $reports_on_binnacle = $result['reports_on_binnacle'];
          foreach( $reports_on_binnacle as $report) {
             $binnacle->Reports()->attach($report['id']);
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($binnacle,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $binnacle = Binnacle::where('id',$result['id'])->update([
             'start'=>$result['start'],
             'end'=>$result['end'],
             'address_start_map_latitude'=>$result['address_start_map_latitude'],
             'address_start_map_longitude'=>$result['address_start_map_longitude'],
             'address_end_map_latitude'=>$result['address_end_map_latitude'],
             'address_end_map_longitude'=>$result['address_end_map_longitude'],
             'address_start'=>$result['address_start'],
             'address_end'=>$result['address_end'],
             'oddometer_start'=>$result['oddometer_start'],
             'oddometer_end'=>$result['oddometer_end'],
             'price'=>$result['price'],
             'transport_id'=>$result['transport_id'],
             'route_id'=>$result['route_id'],
             'driver_id'=>$result['driver_id'],
          ]);
          $binnacle = Binnacle::where('id',$result['id'])->first();
          $passenger_binacles_on_binnacle = $result['passenger_binacles_on_binnacle'];
          $passenger_binacles_on_binnacle_old = $binnacle->PassengerBinacles()->get();
          foreach( $passenger_binacles_on_binnacle_old as $passenger_binacle_old ) {
             $delete = true;
             foreach( $passenger_binacles_on_binnacle as $passenger_binacle ) {
                if ( $passenger_binacle_old->id === $passenger_binacle['id'] ) {
                   $delete = false;
                }
             }
             if ( $delete ) {
                $binnacle->PassengerBinacles()->detach($passenger_binacle_old->id);
             }
          }
          foreach( $passenger_binacles_on_binnacle as $passenger_binacle ) {
             $add = true;
             foreach( $passenger_binacles_on_binnacle_old as $passenger_binacle_old) {
                if ( $passenger_binacle_old->id === $passenger_binacle['id'] ) {
                   $add = false;
                }
             }
             if ( $add ) {
                $binnacle->PassengerBinacles()->attach($passenger_binacle['id']);
             }
          }
          $binnacle = Binnacle::where('id',$result['id'])->first();
          $reports_on_binnacle = $result['reports_on_binnacle'];
          $reports_on_binnacle_old = $binnacle->Reports()->get();
          foreach( $reports_on_binnacle_old as $report_old ) {
             $delete = true;
             foreach( $reports_on_binnacle as $report ) {
                if ( $report_old->id === $report['id'] ) {
                   $delete = false;
                }
             }
             if ( $delete ) {
                $binnacle->Reports()->detach($report_old->id);
             }
          }
          foreach( $reports_on_binnacle as $report ) {
             $add = true;
             foreach( $reports_on_binnacle_old as $report_old) {
                if ( $report_old->id === $report['id'] ) {
                   $add = false;
                }
             }
             if ( $add ) {
                $binnacle->Reports()->attach($report['id']);
             }
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($binnacle,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Binnacle::destroy($id);
    }

    function backup(Request $data)
    {
       $binnacles = Binnacle::get();
       $toReturn = [];
       foreach( $binnacles as $binnacle) {
          $attach = [];
          $passenger_binacles_on_binnacle = $binnacle->PassengerBinacles()->get();
          array_push($attach, ["passenger_binacles_on_binnacle"=>$passenger_binacles_on_binnacle]);
          $reports_on_binnacle = $binnacle->Reports()->get();
          array_push($attach, ["reports_on_binnacle"=>$reports_on_binnacle]);
          array_push($toReturn, ["Binnacle"=>$binnacle, "attach"=>$attach]);
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
         $result = $row['Binnacle'];
         $exist = Binnacle::where('id',$result['id'])->first();
         if ($exist) {
           Binnacle::where('id', $result['id'])->update([
             'start'=>$result['start'],
             'end'=>$result['end'],
             'address_start_map_latitude'=>$result['address_start_map_latitude'],
             'address_start_map_longitude'=>$result['address_start_map_longitude'],
             'address_end_map_latitude'=>$result['address_end_map_latitude'],
             'address_end_map_longitude'=>$result['address_end_map_longitude'],
             'address_start'=>$result['address_start'],
             'address_end'=>$result['address_end'],
             'oddometer_start'=>$result['oddometer_start'],
             'oddometer_end'=>$result['oddometer_end'],
             'price'=>$result['price'],
             'transport_id'=>$result['transport_id'],
             'route_id'=>$result['route_id'],
             'driver_id'=>$result['driver_id'],
           ]);
         } else {
          $binnacle = new Binnacle();
          $binnacle->id = $result['id'];
          $binnacle->start = $result['start'];
          $binnacle->end = $result['end'];
          $binnacle->address_start_map_latitude = $result['address_start_map_latitude'];
          $binnacle->address_start_map_longitude = $result['address_start_map_longitude'];
          $binnacle->address_end_map_latitude = $result['address_end_map_latitude'];
          $binnacle->address_end_map_longitude = $result['address_end_map_longitude'];
          $binnacle->address_start = $result['address_start'];
          $binnacle->address_end = $result['address_end'];
          $binnacle->oddometer_start = $result['oddometer_start'];
          $binnacle->oddometer_end = $result['oddometer_end'];
          $binnacle->price = $result['price'];
          $binnacle->transport_id = $result['transport_id'];
          $binnacle->route_id = $result['route_id'];
          $binnacle->driver_id = $result['driver_id'];
          $binnacle->save();
         }
         $binnacle = Binnacle::where('id',$result['id'])->first();
         $passenger_binacles_on_binnacle = [];
         foreach($row['attach'] as $attach){
            $passenger_binacles_on_binnacle = $attach['passenger_binacles_on_binnacle'];
         }
         $passenger_binacles_on_binnacle_old = $binnacle->PassengerBinacles()->get();
         foreach( $passenger_binacles_on_binnacle_old as $passenger_binacle_old ) {
            $delete = true;
            foreach( $passenger_binacles_on_binnacle as $passenger_binacle ) {
               if ( $passenger_binacle_old->id === $passenger_binacle['id'] ) {
                  $delete = false;
               }
            }
            if ( $delete ) {
               $binnacle->PassengerBinacles()->detach($passenger_binacle_old->id);
            }
         }
         foreach( $passenger_binacles_on_binnacle as $passenger_binacle ) {
            $add = true;
            foreach( $passenger_binacles_on_binnacle_old as $passenger_binacle_old) {
               if ( $passenger_binacle_old->id === $passenger_binacle['id'] ) {
                  $add = false;
               }
            }
            if ( $add ) {
               $binnacle->PassengerBinacles()->attach($passenger_binacle['id']);
            }
         }
         $binnacle = Binnacle::where('id',$result['id'])->first();
         $reports_on_binnacle = [];
         foreach($row['attach'] as $attach){
            $reports_on_binnacle = $attach['reports_on_binnacle'];
         }
         $reports_on_binnacle_old = $binnacle->Reports()->get();
         foreach( $reports_on_binnacle_old as $report_old ) {
            $delete = true;
            foreach( $reports_on_binnacle as $report ) {
               if ( $report_old->id === $report['id'] ) {
                  $delete = false;
               }
            }
            if ( $delete ) {
               $binnacle->Reports()->detach($report_old->id);
            }
         }
         foreach( $reports_on_binnacle as $report ) {
            $add = true;
            foreach( $reports_on_binnacle_old as $report_old) {
               if ( $report_old->id === $report['id'] ) {
                  $add = false;
               }
            }
            if ( $add ) {
               $binnacle->Reports()->attach($report['id']);
            }
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}