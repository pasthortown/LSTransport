<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\AccountRolAssigment;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AccountRolAssigmentController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(AccountRolAssigment::get(),200);
       } else {
          $accountrolassigment = AccountRolAssigment::findOrFail($id);
          $attach = [];
          return response()->json(["AccountRolAssigment"=>$accountrolassigment, "attach"=>$attach],200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(AccountRolAssigment::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $accountrolassigment = new AccountRolAssigment();
          $lastAccountRolAssigment = AccountRolAssigment::orderBy('id')->get()->last();
          if($lastAccountRolAssigment) {
             $accountrolassigment->id = $lastAccountRolAssigment->id + 1;
          } else {
             $accountrolassigment->id = 1;
          }
          $accountrolassigment->account_rol_id = $result['account_rol_id'];
          $accountrolassigment->save();
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($accountrolassigment,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $accountrolassigment = AccountRolAssigment::where('id',$result['id'])->update([
             'account_rol_id'=>$result['account_rol_id'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($accountrolassigment,200);
    }

    function delete(Request $data)
    {
       $id = $data['id'];
       return AccountRolAssigment::destroy($id);
    }

    function backup(Request $data)
    {
       $accountrolassigments = AccountRolAssigment::get();
       $toReturn = [];
       foreach( $accountrolassigments as $accountrolassigment) {
          $attach = [];
          array_push($toReturn, ["AccountRolAssigment"=>$accountrolassigment, "attach"=>$attach]);
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
         $result = $row['AccountRolAssigment'];
         $exist = AccountRolAssigment::where('id',$result['id'])->first();
         if ($exist) {
           AccountRolAssigment::where('id', $result['id'])->update([
             'account_rol_id'=>$result['account_rol_id'],
           ]);
         } else {
          $accountrolassigment = new AccountRolAssigment();
          $accountrolassigment->id = $result['id'];
          $accountrolassigment->account_rol_id = $result['account_rol_id'];
          $accountrolassigment->save();
         }
       }
       DB::commit();
      } catch (Exception $e) {
         return response()->json($e,400);
      }
      return response()->json('Task Complete',200);
    }
}