import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         {
            path: '',
            redirectTo: 'main'
         },
         {
            path: 'main',
            loadChildren: './main/main.module#MainModule'
         },
         {
            path: 'profile',
            loadChildren: './profile/profile.module#ProfileModule'
         },

         //BASE

         {
            path: 'transport',
            loadChildren: './CRUD/BASE/Transport/transport.module#TransportModule'
         },
         {
            path: 'driver',
            loadChildren: './CRUD/BASE/Driver/driver.module#DriverModule'
         },
         {
            path: 'passenger',
            loadChildren: './CRUD/BASE/Passenger/passenger.module#PassengerModule'
         },
         {
            path: 'transport_picture',
            loadChildren: './CRUD/BASE/TransportPicture/transportpicture.module#TransportPictureModule'
         },
         {
            path: 'route',
            loadChildren: './CRUD/BASE/Route/route.module#RouteModule'
         },
         {
            path: 'transport_document',
            loadChildren: './CRUD/BASE/TransportDocument/transportdocument.module#TransportDocumentModule'
         },
         {
            path: 'binnacle',
            loadChildren: './CRUD/BASE/Binnacle/binnacle.module#BinnacleModule'
         },
         {
            path: 'passenger_binacle',
            loadChildren: './CRUD/BASE/PassengerBinacle/passengerbinacle.module#PassengerBinacleModule'
         },
         {
            path: 'report',
            loadChildren: './CRUD/BASE/Report/report.module#ReportModule'
         },
         {
            path: 'report_state',
            loadChildren: './CRUD/BASE/ReportState/reportstate.module#ReportStateModule'
         },
         {
            path: 'report_response',
            loadChildren: './CRUD/BASE/ReportResponse/reportresponse.module#ReportResponseModule'
         },
         {
            path: 'account_rol',
            loadChildren: './CRUD/BASE/AccountRol/accountrol.module#AccountRolModule'
         },
         {
            path: 'account_rol_assigment',
            loadChildren: './CRUD/BASE/AccountRolAssigment/accountrolassigment.module#AccountRolAssigmentModule'
         },
         {
            path: 'transport_document_attachment',
            loadChildren: './CRUD/BASE/TransportDocumentAttachment/transportdocumentattachment.module#TransportDocumentAttachmentModule'
         },
         {
            path: 'blank',
            loadChildren: './blank-page/blank-page.module#BlankPageModule'
         },
         {
            path: 'not-found',
            loadChildren: './not-found/not-found.module#NotFoundModule'
         },
         {
            path: '**',
            redirectTo: 'not-found'
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LayoutRoutingModule {}