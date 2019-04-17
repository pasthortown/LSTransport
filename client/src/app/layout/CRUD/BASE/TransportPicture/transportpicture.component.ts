import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { TransportPictureService } from './../../../../services/CRUD/BASE/transportpicture.service';
import { TransportPicture } from './../../../../models/BASE/TransportPicture';
import { TransportService } from './../../../../services/CRUD/BASE/transport.service';
import { Transport } from './../../../../models/BASE/Transport';


@Component({
   selector: 'app-transportpicture',
   templateUrl: './transportpicture.component.html',
   styleUrls: ['./transportpicture.component.scss']
})
export class TransportPictureComponent implements OnInit {
   transport_pictures: TransportPicture[] = [];
   transport_pictureSelected: TransportPicture = new TransportPicture();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   transports: Transport[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private transportDataService: TransportService,
               private transport_pictureDataService: TransportPictureService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getTransport();
   }

   CodeFileTransportPicture(event) {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         reader.readAsDataURL(file);
         reader.onload = () => {
            this.transport_pictureSelected.transport_picture_file_name = file.name;
            this.transport_pictureSelected.transport_picture_file_type = file.type;
            this.transport_pictureSelected.transport_picture_file = reader.result.toString().split(',')[1];
         };
      }
   }

   selectTransportPicture(transport_picture: TransportPicture) {
      this.transport_pictureSelected = transport_picture;
   }

   getTransport() {
      this.transports = [];
      this.transportDataService.get().then( r => {
         this.transports = r as Transport[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getTransportPictures();
   }

   getTransportPictures() {
      this.transport_pictures = [];
      this.transport_pictureSelected = new TransportPicture();
      this.transport_pictureSelected.transport_id = 0;
      this.transport_pictureDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.transport_pictures = r.data as TransportPicture[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newTransportPicture(content) {
      this.transport_pictureSelected = new TransportPicture();
      this.transport_pictureSelected.transport_id = 0;
      this.openDialog(content);
   }

   editTransportPicture(content) {
      if (typeof this.transport_pictureSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteTransportPicture() {
      if (typeof this.transport_pictureSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.transport_pictureDataService.delete(this.transport_pictureSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getTransportPictures();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.transport_pictureDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_TransportPictures.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.transport_pictureDataService.get().then( r => {
         const backupData = r as TransportPicture[];
         let output = 'id;transport_picture_file_type;transport_picture_file_name;transport_picture_file;transport_id\n';
         backupData.forEach(element => {
            output += element.id; + element.transport_picture_file_type + ';' + element.transport_picture_file_name + ';' + element.transport_picture_file + ';' + element.transport_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_TransportPictures.csv');
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
            this.transport_pictureDataService.masiveLoad(newData).then( r => {
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
            if (typeof this.transport_pictureSelected.id === 'undefined') {
               this.transport_pictureDataService.post(this.transport_pictureSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getTransportPictures();
               }).catch( e => console.log(e) );
            } else {
               this.transport_pictureDataService.put(this.transport_pictureSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getTransportPictures();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}