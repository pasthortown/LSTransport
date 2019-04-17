import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ReportResponseService } from './../../../../services/CRUD/BASE/reportresponse.service';
import { ReportResponse } from './../../../../models/BASE/ReportResponse';
import { UserService } from './../../../../services/profile/user.service';
import { User } from './../../../../models/profile/User';


@Component({
   selector: 'app-reportresponse',
   templateUrl: './reportresponse.component.html',
   styleUrls: ['./reportresponse.component.scss']
})
export class ReportResponseComponent implements OnInit {
   report_responses: ReportResponse[] = [];
   report_responseSelected: ReportResponse = new ReportResponse();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   users: User[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private userDataService: UserService,
               private report_responseDataService: ReportResponseService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getUser();
   }

   selectReportResponse(report_response: ReportResponse) {
      this.report_responseSelected = report_response;
   }

   getUser() {
      this.users = [];
      this.userDataService.get().then( r => {
         this.users = r as User[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getReportResponses();
   }

   getReportResponses() {
      this.report_responses = [];
      this.report_responseSelected = new ReportResponse();
      this.report_responseSelected.user_id = 0;
      this.report_responseDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.report_responses = r.data as ReportResponse[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newReportResponse(content) {
      this.report_responseSelected = new ReportResponse();
      this.report_responseSelected.user_id = 0;
      this.openDialog(content);
   }

   editReportResponse(content) {
      if (typeof this.report_responseSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteReportResponse() {
      if (typeof this.report_responseSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.report_responseDataService.delete(this.report_responseSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getReportResponses();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.report_responseDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ReportResponses.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.report_responseDataService.get().then( r => {
         const backupData = r as ReportResponse[];
         let output = 'id;detail;user_id\n';
         backupData.forEach(element => {
            output += element.id; + element.detail + ';' + element.user_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ReportResponses.csv');
      }).catch( e => console.log(e) );
   }

   decodeUploadFile(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            const fileBytes = reader.result.toString().split(',')[1];
            const newData = JSON.parse(decodeURIComponent(escape(atob(fileBytes)))) as any[];
            this.report_responseDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.report_responseSelected.id === 'undefined') {
               this.report_responseDataService.post(this.report_responseSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getReportResponses();
               }).catch( e => console.log(e) );
            } else {
               this.report_responseDataService.put(this.report_responseSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getReportResponses();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}