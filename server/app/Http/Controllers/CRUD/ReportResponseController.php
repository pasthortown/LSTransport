<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\ReportResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ReportResponseController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(ReportResponse::get(),200);
       } else {
          $reportresponse = ReportResponse::findOrFail($id);
          $attach = [];
          return response()->json(["ReportResponse"=>$reportresponse, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(ReportResponse::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $reportresponse = new ReportResponse();
          $lastReportResponse = ReportResponse::orderBy('id')->get()->last();
          if($lastReportResponse) {
             $reportresponse->id = $lastReportResponse->id + 1;
          } else {
             $reportresponse->id = 1;
          }
          $reportresponse->detail = $result['detail'];
          $reportresponse->user_id = $result['user_id'];
          $reportresponse->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($reportresponse,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $reportresponse = ReportResponse::where('id',$result['id'])->update([
             'detail'=>$result['detail'],
             'user_id'=>$result['user_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($reportresponse,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return ReportResponse::destroy($id);
    }

    function backup(Request $data)
    {
       $reportresponses = ReportResponse::get();
       $toReturn = [];
       foreach( $reportresponses as $reportresponse) {
          $attach = [];
          array_push($toReturn, ["ReportResponse"=>$reportresponse, "attach"=>$attach]);
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
         $result = $row['ReportResponse'];
         $exist = ReportResponse::where('id',$result['id'])->first();
         if ($exist) {
           ReportResponse::where('id', $result['id'])->update([
             'detail'=>$result['detail'],
             'user_id'=>$result['user_id'],
           ]);
         } else {
          $reportresponse = new ReportResponse();
          $reportresponse->id = $result['id'];
          $reportresponse->detail = $result['detail'];
          $reportresponse->user_id = $result['user_id'];
          $reportresponse->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}