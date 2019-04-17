import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { PassengerService } from './../../../../services/CRUD/BASE/passenger.service';
import { Passenger } from './../../../../models/BASE/Passenger';
import { UserService } from './../../../../services/profile/user.service';
import { User } from './../../../../models/profile/User';


@Component({
   selector: 'app-passenger',
   templateUrl: './passenger.component.html',
   styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {
   passengers: Passenger[] = [];
   passengerSelected: Passenger = new Passenger();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   users: User[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private userDataService: UserService,
               private passengerDataService: PassengerService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getUser();
   }

   selectPassenger(passenger: Passenger) {
      this.passengerSelected = passenger;
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
      this.getPassengers();
   }

   address_mapEvent(event) {
      this.passengerSelected.address_map_latitude = event.coords.lat;
      this.passengerSelected.address_map_longitude = event.coords.lng;
   }

   getPassengers() {
      this.passengers = [];
      this.passengerSelected = new Passenger();
      this.passengerSelected.user_id = 0;
      this.passengerDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.passengers = r.data as Passenger[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newPassenger(content) {
      this.passengerSelected = new Passenger();
      this.passengerSelected.user_id = 0;
      this.openDialog(content);
   }

   editPassenger(content) {
      if (typeof this.passengerSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deletePassenger() {
      if (typeof this.passengerSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.passengerDataService.delete(this.passengerSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getPassengers();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.passengerDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Passengers.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.passengerDataService.get().then( r => {
         const backupData = r as Passenger[];
         let output = 'id;phone_number;address_map_latitude;address_map_longitude;address;additional_info;user_id\n';
         backupData.forEach(element => {
            output += element.id; + element.phone_number + ';' + element.address_map_latitude + ';' + element.address_map_longitude + ';' + element.address + ';' + element.additional_info + ';' + element.user_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Passengers.csv');
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
            this.passengerDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.passengerSelected.id === 'undefined') {
               this.passengerDataService.post(this.passengerSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getPassengers();
               }).catch( e => console.log(e) );
            } else {
               this.passengerDataService.put(this.passengerSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getPassengers();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}