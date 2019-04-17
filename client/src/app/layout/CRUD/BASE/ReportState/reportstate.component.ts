import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { ReportStateService } from './../../../../services/CRUD/BASE/reportstate.service';
import { ReportState } from './../../../../models/BASE/ReportState';

@Component({
   selector: 'app-reportstate',
   templateUrl: './reportstate.component.html',
   styleUrls: ['./reportstate.component.scss']
})
export class ReportStateComponent implements OnInit {
   report_states: ReportState[] = [];
   report_stateSelected: ReportState = new ReportState();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private report_stateDataService: ReportStateService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectReportState(report_state: ReportState) {
      this.report_stateSelected = report_state;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getReportStates();
   }

   getReportStates() {
      this.report_states = [];
      this.report_stateSelected = new ReportState();
      this.report_stateDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.report_states = r.data as ReportState[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newReportState(content) {
      this.report_stateSelected = new ReportState();
      this.openDialog(content);
   }

   editReportState(content) {
      if (typeof this.report_stateSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteReportState() {
      if (typeof this.report_stateSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.report_stateDataService.delete(this.report_stateSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getReportStates();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.report_stateDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ReportStates.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.report_stateDataService.get().then( r => {
         const backupData = r as ReportState[];
         let output = 'id;name\n';
         backupData.forEach(element => {
            output += element.id; + element.name + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_ReportStates.csv');
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
            this.report_stateDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.report_stateSelected.id === 'undefined') {
               this.report_stateDataService.post(this.report_stateSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getReportStates();
               }).catch( e => console.log(e) );
            } else {
               this.report_stateDataService.put(this.report_stateSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getReportStates();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}