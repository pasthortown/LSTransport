<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\TransportDocument;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TransportDocumentController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(TransportDocument::get(),200);
       } else {
          $transportdocument = TransportDocument::findOrFail($id);
          $attach = [];
          return response()->json(["TransportDocument"=>$transportdocument, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(TransportDocument::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $transportdocument = new TransportDocument();
          $lastTransportDocument = TransportDocument::orderBy('id')->get()->last();
          if($lastTransportDocument) {
             $transportdocument->id = $lastTransportDocument->id + 1;
          } else {
             $transportdocument->id = 1;
          }
          $transportdocument->name = $result['name'];
          $transportdocument->code = $result['code'];
          $transportdocument->validity_start = $result['validity_start'];
          $transportdocument->validity_end = $result['validity_end'];
          $transportdocument->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($transportdocument,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $transportdocument = TransportDocument::where('id',$result['id'])->update([
             'name'=>$result['name'],
             'code'=>$result['code'],
             'validity_start'=>$result['validity_start'],
             'validity_end'=>$result['validity_end'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($transportdocument,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return TransportDocument::destroy($id);
    }

    function backup(Request $data)
    {
       $transportdocuments = TransportDocument::get();
       $toReturn = [];
       foreach( $transportdocuments as $transportdocument) {
          $attach = [];
          array_push($toReturn, ["TransportDocument"=>$transportdocument, "attach"=>$attach]);
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
         $result = $row['TransportDocument'];
         $exist = TransportDocument::where('id',$result['id'])->first();
         if ($exist) {
           TransportDocument::where('id', $result['id'])->update([
             'name'=>$result['name'],
             'code'=>$result['code'],
             'validity_start'=>$result['validity_start'],
             'validity_end'=>$result['validity_end'],
           ]);
         } else {
          $transportdocument = new TransportDocument();
          $transportdocument->id = $result['id'];
          $transportdocument->name = $result['name'];
          $transportdocument->code = $result['code'];
          $transportdocument->validity_start = $result['validity_start'];
          $transportdocument->validity_end = $result['validity_end'];
          $transportdocument->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}