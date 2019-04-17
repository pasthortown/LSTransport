<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
   return 'Web Wervice Realizado con LSCodeGenerator';
});

$router->group(['middleware' => []], function () use ($router) {
   $router->post('/login', ['uses' => 'AuthController@login']);
   $router->post('/register', ['uses' => 'AuthController@register']);
   $router->post('/password_recovery_request', ['uses' => 'AuthController@passwordRecoveryRequest']);
   $router->get('/password_recovery', ['uses' => 'AuthController@passwordRecovery']);
});

$router->group(['middleware' => ['auth']], function () use ($router) {
   $router->post('/user/password_change', ['uses' => 'AuthController@passwordChange']);


   //BASE

   //CRUD ProfilePicture
   $router->post('/profilepicture', ['uses' => 'ProfilePictureController@post']);
   $router->get('/profilepicture', ['uses' => 'ProfilePictureController@get']);
   $router->get('/profilepicture/paginate', ['uses' => 'ProfilePictureController@paginate']);
   $router->put('/profilepicture', ['uses' => 'ProfilePictureController@put']);
   $router->delete('/profilepicture', ['uses' => 'ProfilePictureController@delete']);

   //CRUD User
   $router->post('/user', ['uses' => 'UserController@post']);
   $router->get('/user', ['uses' => 'UserController@get']);
   $router->get('/user/paginate', ['uses' => 'UserController@paginate']);
   $router->put('/user', ['uses' => 'UserController@put']);
   $router->delete('/user', ['uses' => 'UserController@delete']);

   //CRUD Transport
   $router->post('/transport', ['uses' => 'TransportController@post']);
   $router->get('/transport', ['uses' => 'TransportController@get']);
   $router->get('/transport/paginate', ['uses' => 'TransportController@paginate']);
   $router->get('/transport/backup', ['uses' => 'TransportController@backup']);
   $router->put('/transport', ['uses' => 'TransportController@put']);
   $router->delete('/transport', ['uses' => 'TransportController@delete']);
   $router->post('/transport/masive_load', ['uses' => 'TransportController@masiveLoad']);

   //CRUD Driver
   $router->post('/driver', ['uses' => 'DriverController@post']);
   $router->get('/driver', ['uses' => 'DriverController@get']);
   $router->get('/driver/paginate', ['uses' => 'DriverController@paginate']);
   $router->get('/driver/backup', ['uses' => 'DriverController@backup']);
   $router->put('/driver', ['uses' => 'DriverController@put']);
   $router->delete('/driver', ['uses' => 'DriverController@delete']);
   $router->post('/driver/masive_load', ['uses' => 'DriverController@masiveLoad']);

   //CRUD Passenger
   $router->post('/passenger', ['uses' => 'PassengerController@post']);
   $router->get('/passenger', ['uses' => 'PassengerController@get']);
   $router->get('/passenger/paginate', ['uses' => 'PassengerController@paginate']);
   $router->get('/passenger/backup', ['uses' => 'PassengerController@backup']);
   $router->put('/passenger', ['uses' => 'PassengerController@put']);
   $router->delete('/passenger', ['uses' => 'PassengerController@delete']);
   $router->post('/passenger/masive_load', ['uses' => 'PassengerController@masiveLoad']);

   //CRUD TransportPicture
   $router->post('/transportpicture', ['uses' => 'TransportPictureController@post']);
   $router->get('/transportpicture', ['uses' => 'TransportPictureController@get']);
   $router->get('/transportpicture/paginate', ['uses' => 'TransportPictureController@paginate']);
   $router->get('/transportpicture/backup', ['uses' => 'TransportPictureController@backup']);
   $router->put('/transportpicture', ['uses' => 'TransportPictureController@put']);
   $router->delete('/transportpicture', ['uses' => 'TransportPictureController@delete']);
   $router->post('/transportpicture/masive_load', ['uses' => 'TransportPictureController@masiveLoad']);

   //CRUD Route
   $router->post('/route', ['uses' => 'RouteController@post']);
   $router->get('/route', ['uses' => 'RouteController@get']);
   $router->get('/route/paginate', ['uses' => 'RouteController@paginate']);
   $router->get('/route/backup', ['uses' => 'RouteController@backup']);
   $router->put('/route', ['uses' => 'RouteController@put']);
   $router->delete('/route', ['uses' => 'RouteController@delete']);
   $router->post('/route/masive_load', ['uses' => 'RouteController@masiveLoad']);

   //CRUD TransportDocument
   $router->post('/transportdocument', ['uses' => 'TransportDocumentController@post']);
   $router->get('/transportdocument', ['uses' => 'TransportDocumentController@get']);
   $router->get('/transportdocument/paginate', ['uses' => 'TransportDocumentController@paginate']);
   $router->get('/transportdocument/backup', ['uses' => 'TransportDocumentController@backup']);
   $router->put('/transportdocument', ['uses' => 'TransportDocumentController@put']);
   $router->delete('/transportdocument', ['uses' => 'TransportDocumentController@delete']);
   $router->post('/transportdocument/masive_load', ['uses' => 'TransportDocumentController@masiveLoad']);

   //CRUD Binnacle
   $router->post('/binnacle', ['uses' => 'BinnacleController@post']);
   $router->get('/binnacle', ['uses' => 'BinnacleController@get']);
   $router->get('/binnacle/paginate', ['uses' => 'BinnacleController@paginate']);
   $router->get('/binnacle/backup', ['uses' => 'BinnacleController@backup']);
   $router->put('/binnacle', ['uses' => 'BinnacleController@put']);
   $router->delete('/binnacle', ['uses' => 'BinnacleController@delete']);
   $router->post('/binnacle/masive_load', ['uses' => 'BinnacleController@masiveLoad']);

   //CRUD PassengerBinacle
   $router->post('/passengerbinacle', ['uses' => 'PassengerBinacleController@post']);
   $router->get('/passengerbinacle', ['uses' => 'PassengerBinacleController@get']);
   $router->get('/passengerbinacle/paginate', ['uses' => 'PassengerBinacleController@paginate']);
   $router->get('/passengerbinacle/backup', ['uses' => 'PassengerBinacleController@backup']);
   $router->put('/passengerbinacle', ['uses' => 'PassengerBinacleController@put']);
   $router->delete('/passengerbinacle', ['uses' => 'PassengerBinacleController@delete']);
   $router->post('/passengerbinacle/masive_load', ['uses' => 'PassengerBinacleController@masiveLoad']);

   //CRUD Report
   $router->post('/report', ['uses' => 'ReportController@post']);
   $router->get('/report', ['uses' => 'ReportController@get']);
   $router->get('/report/paginate', ['uses' => 'ReportController@paginate']);
   $router->get('/report/backup', ['uses' => 'ReportController@backup']);
   $router->put('/report', ['uses' => 'ReportController@put']);
   $router->delete('/report', ['uses' => 'ReportController@delete']);
   $router->post('/report/masive_load', ['uses' => 'ReportController@masiveLoad']);

   //CRUD ReportState
   $router->post('/reportstate', ['uses' => 'ReportStateController@post']);
   $router->get('/reportstate', ['uses' => 'ReportStateController@get']);
   $router->get('/reportstate/paginate', ['uses' => 'ReportStateController@paginate']);
   $router->get('/reportstate/backup', ['uses' => 'ReportStateController@backup']);
   $router->put('/reportstate', ['uses' => 'ReportStateController@put']);
   $router->delete('/reportstate', ['uses' => 'ReportStateController@delete']);
   $router->post('/reportstate/masive_load', ['uses' => 'ReportStateController@masiveLoad']);

   //CRUD ReportResponse
   $router->post('/reportresponse', ['uses' => 'ReportResponseController@post']);
   $router->get('/reportresponse', ['uses' => 'ReportResponseController@get']);
   $router->get('/reportresponse/paginate', ['uses' => 'ReportResponseController@paginate']);
   $router->get('/reportresponse/backup', ['uses' => 'ReportResponseController@backup']);
   $router->put('/reportresponse', ['uses' => 'ReportResponseController@put']);
   $router->delete('/reportresponse', ['uses' => 'ReportResponseController@delete']);
   $router->post('/reportresponse/masive_load', ['uses' => 'ReportResponseController@masiveLoad']);

   //CRUD AccountRol
   $router->post('/accountrol', ['uses' => 'AccountRolController@post']);
   $router->get('/accountrol', ['uses' => 'AccountRolController@get']);
   $router->get('/accountrol/paginate', ['uses' => 'AccountRolController@paginate']);
   $router->get('/accountrol/backup', ['uses' => 'AccountRolController@backup']);
   $router->put('/accountrol', ['uses' => 'AccountRolController@put']);
   $router->delete('/accountrol', ['uses' => 'AccountRolController@delete']);
   $router->post('/accountrol/masive_load', ['uses' => 'AccountRolController@masiveLoad']);

   //CRUD AccountRolAssigment
   $router->post('/accountrolassigment', ['uses' => 'AccountRolAssigmentController@post']);
   $router->get('/accountrolassigment', ['uses' => 'AccountRolAssigmentController@get']);
   $router->get('/accountrolassigment/paginate', ['uses' => 'AccountRolAssigmentController@paginate']);
   $router->get('/accountrolassigment/backup', ['uses' => 'AccountRolAssigmentController@backup']);
   $router->put('/accountrolassigment', ['uses' => 'AccountRolAssigmentController@put']);
   $router->delete('/accountrolassigment', ['uses' => 'AccountRolAssigmentController@delete']);
   $router->post('/accountrolassigment/masive_load', ['uses' => 'AccountRolAssigmentController@masiveLoad']);

   //CRUD TransportDocumentAttachment
   $router->post('/transportdocumentattachment', ['uses' => 'TransportDocumentAttachmentController@post']);
   $router->get('/transportdocumentattachment', ['uses' => 'TransportDocumentAttachmentController@get']);
   $router->get('/transportdocumentattachment/paginate', ['uses' => 'TransportDocumentAttachmentController@paginate']);
   $router->get('/transportdocumentattachment/backup', ['uses' => 'TransportDocumentAttachmentController@backup']);
   $router->put('/transportdocumentattachment', ['uses' => 'TransportDocumentAttachmentController@put']);
   $router->delete('/transportdocumentattachment', ['uses' => 'TransportDocumentAttachmentController@delete']);
   $router->post('/transportdocumentattachment/masive_load', ['uses' => 'TransportDocumentAttachmentController@masiveLoad']);

   //CRUD Location
   $router->post('/location', ['uses' => 'LocationController@post']);
   $router->get('/location', ['uses' => 'LocationController@get']);
   $router->get('/location/paginate', ['uses' => 'LocationController@paginate']);
   $router->get('/location/backup', ['uses' => 'LocationController@backup']);
   $router->put('/location', ['uses' => 'LocationController@put']);
   $router->delete('/location', ['uses' => 'LocationController@delete']);
   $router->post('/location/masive_load', ['uses' => 'LocationController@masiveLoad']);
});
