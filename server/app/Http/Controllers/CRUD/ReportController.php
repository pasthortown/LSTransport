<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Report;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ReportController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Report::get(),200);
       } else {
          $report = Report::findOrFail($id);
          $attach = [];
          $report_responses_on_report = $report->ReportResponses()->get();
          array_push($attach, ["report_responses_on_report"=>$report_responses_on_report]);
          return response()->json(["Report"=>$report, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Report::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $report = new Report();
          $lastReport = Report::orderBy('id')->get()->last();
          if($lastReport) {
             $report->id = $lastReport->id + 1;
          } else {
             $report->id = 1;
          }
          $report->detail = $result['detail'];
          $report->user_id = $result['user_id'];
          $report->report_state_id = $result['report_state_id'];
          $report->save();
          $report_responses_on_report = $result['report_responses_on_report'];
          foreach( $report_responses_on_report as $report_response) {
             $report->ReportResponses()->attach($report_response['id']);
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($report,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $report = Report::where('id',$result['id'])->update([
             'detail'=>$result['detail'],
             'user_id'=>$result['user_id'],
             'report_state_id'=>$result['report_state_id'],
          ]);
          $report = Report::where('id',$result['id'])->first();
          $report_responses_on_report = $result['report_responses_on_report'];
          $report_responses_on_report_old = $report->ReportResponses()->get();
          foreach( $report_responses_on_report_old as $report_response_old ) {
             $delete = true;
             foreach( $report_responses_on_report as $report_response ) {
                if ( $report_response_old->id === $report_response['id'] ) {
                   $delete = false;
                }
             }
             if ( $delete ) {
                $report->ReportResponses()->detach($report_response_old->id);
             }
          }
          foreach( $report_responses_on_report as $report_response ) {
             $add = true;
             foreach( $report_responses_on_report_old as $report_response_old) {
                if ( $report_response_old->id === $report_response['id'] ) {
                   $add = false;
                }
             }
             if ( $add ) {
                $report->ReportResponses()->attach($report_response['id']);
             }
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($report,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Report::destroy($id);
    }

    function backup(Request $data)
    {
       $reports = Report::get();
       $toReturn = [];
       foreach( $reports as $report) {
          $attach = [];
          $report_responses_on_report = $report->ReportResponses()->get();
          array_push($attach, ["report_responses_on_report"=>$report_responses_on_report]);
          array_push($toReturn, ["Report"=>$report, "attach"=>$attach]);
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
         $result = $row['Report'];
         $exist = Report::where('id',$result['id'])->first();
         if ($exist) {
           Report::where('id', $result['id'])->update([
             'detail'=>$result['detail'],
             'user_id'=>$result['user_id'],
             'report_state_id'=>$result['report_state_id'],
           ]);
         } else {
          $report = new Report();
          $report->id = $result['id'];
          $report->detail = $result['detail'];
          $report->user_id = $result['user_id'];
          $report->report_state_id = $result['report_state_id'];
          $report->save();
         }
         $report = Report::where('id',$result['id'])->first();
         $report_responses_on_report = [];
         foreach($row['attach'] as $attach){
            $report_responses_on_report = $attach['report_responses_on_report'];
         }
         $report_responses_on_report_old = $report->ReportResponses()->get();
         foreach( $report_responses_on_report_old as $report_response_old ) {
            $delete = true;
            foreach( $report_responses_on_report as $report_response ) {
               if ( $report_response_old->id === $report_response['id'] ) {
                  $delete = false;
               }
            }
            if ( $delete ) {
               $report->ReportResponses()->detach($report_response_old->id);
            }
         }
         foreach( $report_responses_on_report as $report_response ) {
            $add = true;
            foreach( $report_responses_on_report_old as $report_response_old) {
               if ( $report_response_old->id === $report_response['id'] ) {
                  $add = false;
               }
            }
            if ( $add ) {
               $report->ReportResponses()->attach($report_response['id']);
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