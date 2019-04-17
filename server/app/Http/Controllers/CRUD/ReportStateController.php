<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\ReportState;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ReportStateController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(ReportState::get(),200);
       } else {
          $reportstate = ReportState::findOrFail($id);
          $attach = [];
          return response()->json(["ReportState"=>$reportstate, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(ReportState::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $reportstate = new ReportState();
          $lastReportState = ReportState::orderBy('id')->get()->last();
          if($lastReportState) {
             $reportstate->id = $lastReportState->id + 1;
          } else {
             $reportstate->id = 1;
          }
          $reportstate->name = $result['name'];
          $reportstate->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($reportstate,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $reportstate = ReportState::where('id',$result['id'])->update([
             'name'=>$result['name'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($reportstate,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return ReportState::destroy($id);
    }

    function backup(Request $data)
    {
       $reportstates = ReportState::get();
       $toReturn = [];
       foreach( $reportstates as $reportstate) {
          $attach = [];
          array_push($toReturn, ["ReportState"=>$reportstate, "attach"=>$attach]);
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
         $result = $row['ReportState'];
         $exist = ReportState::where('id',$result['id'])->first();
         if ($exist) {
           ReportState::where('id', $result['id'])->update([
             'name'=>$result['name'],
           ]);
         } else {
          $reportstate = new ReportState();
          $reportstate->id = $result['id'];
          $reportstate->name = $result['name'];
          $reportstate->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}