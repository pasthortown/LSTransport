<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Transport;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TransportController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Transport::get(),200);
       } else {
          $transport = Transport::findOrFail($id);
          $attach = [];
          $transport_documents_on_transport = $transport->TransportDocuments()->get();
          array_push($attach, ["transport_documents_on_transport"=>$transport_documents_on_transport]);
          return response()->json(["Transport"=>$transport, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Transport::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $transport = new Transport();
          $lastTransport = Transport::orderBy('id')->get()->last();
          if($lastTransport) {
             $transport->id = $lastTransport->id + 1;
          } else {
             $transport->id = 1;
          }
          $transport->plate = $result['plate'];
          $transport->save();
          $transport_documents_on_transport = $result['transport_documents_on_transport'];
          foreach( $transport_documents_on_transport as $transport_document) {
             $transport->TransportDocuments()->attach($transport_document['id']);
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($transport,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $transport = Transport::where('id',$result['id'])->update([
             'plate'=>$result['plate'],
          ]);
          $transport = Transport::where('id',$result['id'])->first();
          $transport_documents_on_transport = $result['transport_documents_on_transport'];
          $transport_documents_on_transport_old = $transport->TransportDocuments()->get();
          foreach( $transport_documents_on_transport_old as $transport_document_old ) {
             $delete = true;
             foreach( $transport_documents_on_transport as $transport_document ) {
                if ( $transport_document_old->id === $transport_document['id'] ) {
                   $delete = false;
                }
             }
             if ( $delete ) {
                $transport->TransportDocuments()->detach($transport_document_old->id);
             }
          }
          foreach( $transport_documents_on_transport as $transport_document ) {
             $add = true;
             foreach( $transport_documents_on_transport_old as $transport_document_old) {
                if ( $transport_document_old->id === $transport_document['id'] ) {
                   $add = false;
                }
             }
             if ( $add ) {
                $transport->TransportDocuments()->attach($transport_document['id']);
             }
          }
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($transport,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return Transport::destroy($id);
    }

    function backup(Request $data)
    {
       $transports = Transport::get();
       $toReturn = [];
       foreach( $transports as $transport) {
          $attach = [];
          $transport_documents_on_transport = $transport->TransportDocuments()->get();
          array_push($attach, ["transport_documents_on_transport"=>$transport_documents_on_transport]);
          array_push($toReturn, ["Transport"=>$transport, "attach"=>$attach]);
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
         $result = $row['Transport'];
         $exist = Transport::where('id',$result['id'])->first();
         if ($exist) {
           Transport::where('id', $result['id'])->update([
             'plate'=>$result['plate'],
           ]);
         } else {
          $transport = new Transport();
          $transport->id = $result['id'];
          $transport->plate = $result['plate'];
          $transport->save();
         }
         $transport = Transport::where('id',$result['id'])->first();
         $transport_documents_on_transport = [];
         foreach($row['attach'] as $attach){
            $transport_documents_on_transport = $attach['transport_documents_on_transport'];
         }
         $transport_documents_on_transport_old = $transport->TransportDocuments()->get();
         foreach( $transport_documents_on_transport_old as $transport_document_old ) {
            $delete = true;
            foreach( $transport_documents_on_transport as $transport_document ) {
               if ( $transport_document_old->id === $transport_document['id'] ) {
                  $delete = false;
               }
            }
            if ( $delete ) {
               $transport->TransportDocuments()->detach($transport_document_old->id);
            }
         }
         foreach( $transport_documents_on_transport as $transport_document ) {
            $add = true;
            foreach( $transport_documents_on_transport_old as $transport_document_old) {
               if ( $transport_document_old->id === $transport_document['id'] ) {
                  $add = false;
               }
            }
            if ( $add ) {
               $transport->TransportDocuments()->attach($transport_document['id']);
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