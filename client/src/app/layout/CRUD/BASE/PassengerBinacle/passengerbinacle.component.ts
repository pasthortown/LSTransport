import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { PassengerBinacleService } from './../../../../services/CRUD/BASE/passengerbinacle.service';
import { PassengerBinacle } from './../../../../models/BASE/PassengerBinacle';
import { PassengerService } from './../../../../services/CRUD/BASE/passenger.service';
import { Passenger } from './../../../../models/BASE/Passenger';


@Component({
   selector: 'app-passengerbinacle',
   templateUrl: './passengerbinacle.component.html',
   styleUrls: ['./passengerbinacle.component.scss']
})
export class PassengerBinacleComponent implements OnInit {
   passenger_binacles: PassengerBinacle[] = [];
   passenger_binacleSelected: PassengerBinacle = new PassengerBinacle();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   passengers: Passenger[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private passengerDataService: PassengerService,
               private passenger_binacleDataService: PassengerBinacleService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getPassenger();
   }

   selectPassengerBinacle(passenger_binacle: PassengerBinacle) {
      this.passenger_binacleSelected = passenger_binacle;
   }

   getPassenger() {
      this.passengers = [];
      this.passengerDataService.get().then( r => {
         this.passengers = r as Passenger[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getPassengerBinacles();
   }

   address_startEvent(event) {
      this.passenger_binacleSelected.address_start_latitude = event.coords.lat;
      this.passenger_binacleSelected.address_start_longitude = event.coords.lng;
   }

   address_endEvent(event) {
      this.passenger_binacleSelected.address_end_latitude = event.coords.lat;
      this.passenger_binacleSelected.address_end_longitude = event.coords.lng;
   }

   getPassengerBinacles() {
      this.passenger_binacles = [];
      this.passenger_binacleSelected = new PassengerBinacle();
      this.passenger_binacleSelected.passenger_id = 0;
      this.passenger_binacleDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.passenger_binacles = r.data as PassengerBinacle[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newPassengerBinacle(content) {
      this.passenger_binacleSelected = new PassengerBinacle();
      this.passenger_binacleSelected.passenger_id = 0;
      this.openDialog(content);
   }

   editPassengerBinacle(content) {
      if (typeof this.passenger_binacleSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deletePassengerBinacle() {
      if (typeof this.passenger_binacleSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.passenger_binacleDataService.delete(this.passenger_binacleSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getPassengerBinacles();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.passenger_binacleDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_PassengerBinacles.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.passenger_binacleDataService.get().then( r => {
         const backupData = r as PassengerBinacle[];
         let output = 'id;time_start;time_end;aboard;address_start_latitude;address_start_longitude;address_end_latitude;address_end_longitude;passenger_id\n';
         backupData.forEach(element => {
            output += element.id; + element.time_start + ';' + element.time_end + ';' + element.aboard + ';' + element.address_start_latitude + ';' + element.address_start_longitude + ';' + element.address_end_latitude + ';' + element.address_end_longitude + ';' + element.passenger_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_PassengerBinacles.csv');
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
            this.passenger_binacleDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.passenger_binacleSelected.id === 'undefined') {
               this.passenger_binacleDataService.post(this.passenger_binacleSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getPassengerBinacles();
               }).catch( e => console.log(e) );
            } else {
               this.passenger_binacleDataService.put(this.passenger_binacleSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getPassengerBinacles();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}