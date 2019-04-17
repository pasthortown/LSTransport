import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ReportService } from './../../../../services/CRUD/BASE/report.service';
import { Report } from './../../../../models/BASE/Report';
import { UserService } from './../../../../services/profile/user.service';
import { User } from './../../../../models/profile/User';

import { ReportStateService } from './../../../../services/CRUD/BASE/reportstate.service';
import { ReportState } from './../../../../models/BASE/ReportState';

import { ReportResponseService } from './../../../../services/CRUD/BASE/reportresponse.service';
import { ReportResponse } from './../../../../models/BASE/ReportResponse';


@Component({
   selector: 'app-report',
   templateUrl: './report.component.html',
   styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
   reports: Report[] = [];
   reportSelected: Report = new Report();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   users: User[] = [];
   report_states: ReportState[] = [];
   report_responses: ReportResponse[] = [];
   report_responses_reportSelectedId: number;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private userDataService: UserService,
               private report_stateDataService: ReportStateService,
               private report_responseDataService: ReportResponseService,
               private reportDataService: ReportService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getUser();
      this.getReportState();
      this.getReportResponse();
   }

   selectReport(report: Report) {
      this.reportSelected = report;
   }

   getUser() {
      this.users = [];
      this.userDataService.get().then( r => {
         this.users = r as User[];
      }).catch( e => console.log(e) );
   }

   getReportState() {
      this.report_states = [];
      this.report_stateDataService.get().then( r => {
         this.report_states = r as ReportState[];
      }).catch( e => console.log(e) );
   }

   getReportResponse() {
      this.report_responses = [];
      this.report_responseDataService.get().then( r => {
         this.report_responses = r as ReportResponse[];
      }).catch( e => console.log(e) );
   }

   getReportResponsesOnReport() {
      this.reportSelected.report_responses_on_report = [];
      this.reportDataService.get(this.reportSelected.id).then( r => {
         this.reportSelected.report_responses_on_report = r.attach[0].report_responses_on_report as ReportResponse[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getReports();
   }

   getReports() {
      this.reports = [];
      this.reportSelected = new Report();
      this.reportSelected.user_id = 0;
      this.reportSelected.report_state_id = 0;
      this.report_responses_reportSelectedId = 0;
      this.reportDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.reports = r.data as Report[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newReport(content) {
      this.reportSelected = new Report();
      this.reportSelected.user_id = 0;
      this.reportSelected.report_state_id = 0;
      this.report_responses_reportSelectedId = 0;
      this.openDialog(content);
   }

   editReport(content) {
      if ( typeof this.reportSelected.report_responses_on_report === 'undefined' ) {
         this.reportSelected.report_responses_on_report = [];
      }
      if (typeof this.reportSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.getReportResponsesOnReport();
      this.report_responses_reportSelectedId = 0;
      this.openDialog(content);
   }

   deleteReport() {
      if (typeof this.reportSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.reportDataService.delete(this.reportSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getReports();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.reportDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Reports.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.reportDataService.get().then( r => {
         const backupData = r as Report[];
         let output = 'id;detail;user_id;report_state_id\n';
         backupData.forEach(element => {
            output += element.id; + element.detail + ';' + element.user_id + ';' + element.report_state_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Reports.csv');
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
            this.reportDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   selectReportResponse(report_response: ReportResponse) {
      this.report_responses_reportSelectedId = report_response.id;
   }

   addReportResponse() {
      if (this.report_responses_reportSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      this.report_responses.forEach(report_response => {
         if (report_response.id == this.report_responses_reportSelectedId) {
            let existe = false;
            this.reportSelected.report_responses_on_report.forEach(element => {
               if (element.id == report_response.id) {
                  existe = true;
               }
            });
            if (!existe) {
               this.reportSelected.report_responses_on_report.push(report_response);
               this.report_responses_reportSelectedId = 0;
            } else {
               this.toastr.errorToastr('El registro ya existe.', 'Error');
            }
         }
      });
   }

   removeReportResponse() {
      if (this.report_responses_reportSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      const newReportResponses: ReportResponse[] = [];
      let eliminado = false;
      this.reportSelected.report_responses_on_report.forEach(report_response => {
         if (report_response.id !== this.report_responses_reportSelectedId) {
            newReportResponses.push(report_response);
         } else {
            eliminado = true;
         }
      });
      if (!eliminado) {
         this.toastr.errorToastr('Registro no encontrado.', 'Error');
         return;
      }
      this.reportSelected.report_responses_on_report = newReportResponses;
      this.report_responses_reportSelectedId = 0;
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.reportSelected.id === 'undefined') {
               this.reportDataService.post(this.reportSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getReports();
               }).catch( e => console.log(e) );
            } else {
               this.reportDataService.put(this.reportSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getReports();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}