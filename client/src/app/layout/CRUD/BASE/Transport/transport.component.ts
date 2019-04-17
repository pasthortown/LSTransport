import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { TransportService } from './../../../../services/CRUD/BASE/transport.service';
import { Transport } from './../../../../models/BASE/Transport';
import { TransportDocumentService } from './../../../../services/CRUD/BASE/transportdocument.service';
import { TransportDocument } from './../../../../models/BASE/TransportDocument';


@Component({
   selector: 'app-transport',
   templateUrl: './transport.component.html',
   styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {
   transports: Transport[] = [];
   transportSelected: Transport = new Transport();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   transport_documents: TransportDocument[] = [];
   transport_documents_transportSelectedId: number;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private transport_documentDataService: TransportDocumentService,
               private transportDataService: TransportService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getTransportDocument();
   }

   selectTransport(transport: Transport) {
      this.transportSelected = transport;
   }

   getTransportDocument() {
      this.transport_documents = [];
      this.transport_documentDataService.get().then( r => {
         this.transport_documents = r as TransportDocument[];
      }).catch( e => console.log(e) );
   }

   getTransportDocumentsOnTransport() {
      this.transportSelected.transport_documents_on_transport = [];
      this.transportDataService.get(this.transportSelected.id).then( r => {
         this.transportSelected.transport_documents_on_transport = r.attach[0].transport_documents_on_transport as TransportDocument[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getTransports();
   }

   getTransports() {
      this.transports = [];
      this.transportSelected = new Transport();
      this.transport_documents_transportSelectedId = 0;
      this.transportDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.transports = r.data as Transport[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newTransport(content) {
      this.transportSelected = new Transport();
      this.transport_documents_transportSelectedId = 0;
      this.openDialog(content);
   }

   editTransport(content) {
      if ( typeof this.transportSelected.transport_documents_on_transport === 'undefined' ) {
         this.transportSelected.transport_documents_on_transport = [];
      }
      if (typeof this.transportSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.getTransportDocumentsOnTransport();
      this.transport_documents_transportSelectedId = 0;
      this.openDialog(content);
   }

   deleteTransport() {
      if (typeof this.transportSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.transportDataService.delete(this.transportSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getTransports();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.transportDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Transports.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.transportDataService.get().then( r => {
         const backupData = r as Transport[];
         let output = 'id;plate\n';
         backupData.forEach(element => {
            output += element.id; + element.plate + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Transports.csv');
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
            this.transportDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   selectTransportDocument(transport_document: TransportDocument) {
      this.transport_documents_transportSelectedId = transport_document.id;
   }

   addTransportDocument() {
      if (this.transport_documents_transportSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      this.transport_documents.forEach(transport_document => {
         if (transport_document.id == this.transport_documents_transportSelectedId) {
            let existe = false;
            this.transportSelected.transport_documents_on_transport.forEach(element => {
               if (element.id == transport_document.id) {
                  existe = true;
               }
            });
            if (!existe) {
               this.transportSelected.transport_documents_on_transport.push(transport_document);
               this.transport_documents_transportSelectedId = 0;
            } else {
               this.toastr.errorToastr('El registro ya existe.', 'Error');
            }
         }
      });
   }

   removeTransportDocument() {
      if (this.transport_documents_transportSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      const newTransportDocuments: TransportDocument[] = [];
      let eliminado = false;
      this.transportSelected.transport_documents_on_transport.forEach(transport_document => {
         if (transport_document.id !== this.transport_documents_transportSelectedId) {
            newTransportDocuments.push(transport_document);
         } else {
            eliminado = true;
         }
      });
      if (!eliminado) {
         this.toastr.errorToastr('Registro no encontrado.', 'Error');
         return;
      }
      this.transportSelected.transport_documents_on_transport = newTransportDocuments;
      this.transport_documents_transportSelectedId = 0;
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.transportSelected.id === 'undefined') {
               this.transportDataService.post(this.transportSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getTransports();
               }).catch( e => console.log(e) );
            } else {
               this.transportDataService.put(this.transportSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getTransports();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}