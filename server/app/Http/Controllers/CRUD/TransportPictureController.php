<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\TransportPicture;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TransportPictureController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(TransportPicture::get(),200);
       } else {
          $transportpicture = TransportPicture::findOrFail($id);
          $attach = [];
          return response()->json(["TransportPicture"=>$transportpicture, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(TransportPicture::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $transportpicture = new TransportPicture();
          $lastTransportPicture = TransportPicture::orderBy('id')->get()->last();
          if($lastTransportPicture) {
             $transportpicture->id = $lastTransportPicture->id + 1;
          } else {
             $transportpicture->id = 1;
          }
          $transportpicture->transport_picture_file_type = $result['transport_picture_file_type'];
          $transportpicture->transport_picture_file_name = $result['transport_picture_file_name'];
          $transportpicture->transport_picture_file = $result['transport_picture_file'];
          $transportpicture->transport_id = $result['transport_id'];
          $transportpicture->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($transportpicture,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $transportpicture = TransportPicture::where('id',$result['id'])->update([
             'transport_picture_file_type'=>$result['transport_picture_file_type'],
             'transport_picture_file_name'=>$result['transport_picture_file_name'],
             'transport_picture_file'=>$result['transport_picture_file'],
             'transport_id'=>$result['transport_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($transportpicture,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return TransportPicture::destroy($id);
    }

    function backup(Request $data)
    {
       $transportpictures = TransportPicture::get();
       $toReturn = [];
       foreach( $transportpictures as $transportpicture) {
          $attach = [];
          array_push($toReturn, ["TransportPicture"=>$transportpicture, "attach"=>$attach]);
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
         $result = $row['TransportPicture'];
         $exist = TransportPicture::where('id',$result['id'])->first();
         if ($exist) {
           TransportPicture::where('id', $result['id'])->update([
             'transport_picture_file_type'=>$result['transport_picture_file_type'],
             'transport_picture_file_name'=>$result['transport_picture_file_name'],
             'transport_picture_file'=>$result['transport_picture_file'],
             'transport_id'=>$result['transport_id'],
           ]);
         } else {
          $transportpicture = new TransportPicture();
          $transportpicture->id = $result['id'];
          $transportpicture->transport_picture_file_type = $result['transport_picture_file_type'];
          $transportpicture->transport_picture_file_name = $result['transport_picture_file_name'];
          $transportpicture->transport_picture_file = $result['transport_picture_file'];
          $transportpicture->transport_id = $result['transport_id'];
          $transportpicture->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}