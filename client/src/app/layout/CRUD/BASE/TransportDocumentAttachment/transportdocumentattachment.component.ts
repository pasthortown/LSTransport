import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { TransportDocumentAttachmentService } from './../../../../services/CRUD/BASE/transportdocumentattachment.service';
import { TransportDocumentAttachment } from './../../../../models/BASE/TransportDocumentAttachment';
import { TransportDocumentService } from './../../../../services/CRUD/BASE/transportdocument.service';
import { TransportDocument } from './../../../../models/BASE/TransportDocument';


@Component({
   selector: 'app-transportdocumentattachment',
   templateUrl: './transportdocumentattachment.component.html',
   styleUrls: ['./transportdocumentattachment.component.scss']
})
export class TransportDocumentAttachmentComponent implements OnInit {
   transport_document_attachments: TransportDocumentAttachment[] = [];
   transport_document_attachmentSelected: TransportDocumentAttachment = new TransportDocumentAttachment();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   transport_documents: TransportDocument[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private transport_documentDataService: TransportDocumentService,
               private transport_document_attachmentDataService: TransportDocumentAttachmentService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getTransportDocument();
   }

   CodeFileTransportDocumentAttachment(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            this.transport_document_attachmentSelected.transport_document_attachment_file_name = file.name;
            this.transport_document_attachmentSelected.transport_document_attachment_file_type = file.type;
            this.transport_document_attachmentSelected.transport_document_attachment_file = reader.result.toString().split(',')[1];
         };
      }
   }

   selectTransportDocumentAttachment(transport_document_attachment: TransportDocumentAttachment) {
      this.transport_document_attachmentSelected = transport_document_attachment;
   }

   getTransportDocument() {
      this.transport_documents = [];
      this.transport_documentDataService.get().then( r => {
         this.transport_documents = r as TransportDocument[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getTransportDocumentAttachments();
   }

   getTransportDocumentAttachments() {
      this.transport_document_attachments = [];
      this.transport_document_attachmentSelected = new TransportDocumentAttachment();
      this.transport_document_attachmentSelected.transport_document_id = 0;
      this.transport_document_attachmentDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.transport_document_attachments = r.data as TransportDocumentAttachment[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newTransportDocumentAttachment(content) {
      this.transport_document_attachmentSelected = new TransportDocumentAttachment();
      this.transport_document_attachmentSelected.transport_document_id = 0;
      this.openDialog(content);
   }

   editTransportDocumentAttachment(content) {
      if (typeof this.transport_document_attachmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteTransportDocumentAttachment() {
      if (typeof this.transport_document_attachmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.transport_document_attachmentDataService.delete(this.transport_document_attachmentSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getTransportDocumentAttachments();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.transport_document_attachmentDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_TransportDocumentAttachments.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.transport_document_attachmentDataService.get().then( r => {
         const backupData = r as TransportDocumentAttachment[];
         let output = 'id;transport_document_attachment_file_type;transport_document_attachment_file_name;transport_document_attachment_file;transport_document_id\n';
         backupData.forEach(element => {
            output += element.id; + element.transport_document_attachment_file_type + ';' + element.transport_document_attachment_file_name + ';' + element.transport_document_attachment_file + ';' + element.transport_document_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_TransportDocumentAttachments.csv');
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
            this.transport_document_attachmentDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   downloadFile(file: string, type: string, name: string) {
      const byteCharacters = atob(file);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
         byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: type});
      saveAs(blob, name);
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.transport_document_attachmentSelected.id === 'undefined') {
               this.transport_document_attachmentDataService.post(this.transport_document_attachmentSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getTransportDocumentAttachments();
               }).catch( e => console.log(e) );
            } else {
               this.transport_document_attachmentDataService.put(this.transport_document_attachmentSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getTransportDocumentAttachments();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}