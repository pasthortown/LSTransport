<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\TransportDocumentAttachment;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TransportDocumentAttachmentController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(TransportDocumentAttachment::get(),200);
       } else {
          $transportdocumentattachment = TransportDocumentAttachment::findOrFail($id);
          $attach = [];
          return response()->json(["TransportDocumentAttachment"=>$transportdocumentattachment, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(TransportDocumentAttachment::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $transportdocumentattachment = new TransportDocumentAttachment();
          $lastTransportDocumentAttachment = TransportDocumentAttachment::orderBy('id')->get()->last();
          if($lastTransportDocumentAttachment) {
             $transportdocumentattachment->id = $lastTransportDocumentAttachment->id + 1;
          } else {
             $transportdocumentattachment->id = 1;
          }
          $transportdocumentattachment->transport_document_attachment_file_type = $result['transport_document_attachment_file_type'];
          $transportdocumentattachment->transport_document_attachment_file_name = $result['transport_document_attachment_file_name'];
          $transportdocumentattachment->transport_document_attachment_file = $result['transport_document_attachment_file'];
          $transportdocumentattachment->transport_document_id = $result['transport_document_id'];
          $transportdocumentattachment->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($transportdocumentattachment,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $transportdocumentattachment = TransportDocumentAttachment::where('id',$result['id'])->update([
             'transport_document_attachment_file_type'=>$result['transport_document_attachment_file_type'],
             'transport_document_attachment_file_name'=>$result['transport_document_attachment_file_name'],
             'transport_document_attachment_file'=>$result['transport_document_attachment_file'],
             'transport_document_id'=>$result['transport_document_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($transportdocumentattachment,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return TransportDocumentAttachment::destroy($id);
    }

    function backup(Request $data)
    {
       $transportdocumentattachments = TransportDocumentAttachment::get();
       $toReturn = [];
       foreach( $transportdocumentattachments as $transportdocumentattachment) {
          $attach = [];
          array_push($toReturn, ["TransportDocumentAttachment"=>$transportdocumentattachment, "attach"=>$attach]);
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
         $result = $row['TransportDocumentAttachment'];
         $exist = TransportDocumentAttachment::where('id',$result['id'])->first();
         if ($exist) {
           TransportDocumentAttachment::where('id', $result['id'])->update([
             'transport_document_attachment_file_type'=>$result['transport_document_attachment_file_type'],
             'transport_document_attachment_file_name'=>$result['transport_document_attachment_file_name'],
             'transport_document_attachment_file'=>$result['transport_document_attachment_file'],
             'transport_document_id'=>$result['transport_document_id'],
           ]);
         } else {
          $transportdocumentattachment = new TransportDocumentAttachment();
          $transportdocumentattachment->id = $result['id'];
          $transportdocumentattachment->transport_document_attachment_file_type = $result['transport_document_attachment_file_type'];
          $transportdocumentattachment->transport_document_attachment_file_name = $result['transport_document_attachment_file_name'];
          $transportdocumentattachment->transport_document_attachment_file = $result['transport_document_attachment_file'];
          $transportdocumentattachment->transport_document_id = $result['transport_document_id'];
          $transportdocumentattachment->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}