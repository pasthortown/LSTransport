import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { TransportDocumentService } from './../../../../services/CRUD/BASE/transportdocument.service';
import { TransportDocument } from './../../../../models/BASE/TransportDocument';

@Component({
   selector: 'app-transportdocument',
   templateUrl: './transportdocument.component.html',
   styleUrls: ['./transportdocument.component.scss']
})
export class TransportDocumentComponent implements OnInit {
   transport_documents: TransportDocument[] = [];
   transport_documentSelected: TransportDocument = new TransportDocument();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private transport_documentDataService: TransportDocumentService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectTransportDocument(transport_document: TransportDocument) {
      this.transport_documentSelected = transport_document;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getTransportDocuments();
   }

   getTransportDocuments() {
      this.transport_documents = [];
      this.transport_documentSelected = new TransportDocument();
      this.transport_documentDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.transport_documents = r.data as TransportDocument[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newTransportDocument(content) {
      this.transport_documentSelected = new TransportDocument();
      this.openDialog(content);
   }

   editTransportDocument(content) {
      if (typeof this.transport_documentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteTransportDocument() {
      if (typeof this.transport_documentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.transport_documentDataService.delete(this.transport_documentSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getTransportDocuments();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.transport_documentDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_TransportDocuments.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.transport_documentDataService.get().then( r => {
         const backupData = r as TransportDocument[];
         let output = 'id;name;code;validity_start;validity_end\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.code + ';' + element.validity_start + ';' + element.validity_end + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_TransportDocuments.csv');
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
            this.transport_documentDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.transport_documentSelected.id === 'undefined') {
               this.transport_documentDataService.post(this.transport_documentSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getTransportDocuments();
               }).catch( e => console.log(e) );
            } else {
               this.transport_documentDataService.put(this.transport_documentSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getTransportDocuments();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}