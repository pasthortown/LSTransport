import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { LocationService } from './../../../../services/CRUD/BASE/location.service';
import { Location } from './../../../../models/BASE/Location';
import { UserService } from './../../../../services/profile/user.service';
import { User } from './../../../../models/profile/User';


@Component({
   selector: 'app-location',
   templateUrl: './location.component.html',
   styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
   locations: Location[] = [];
   locationSelected: Location = new Location();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   users: User[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private userDataService: UserService,
               private locationDataService: LocationService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getUser();
   }

   selectLocation(location: Location) {
      this.locationSelected = location;
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
      this.getLocations();
   }

   coordsEvent(event) {
      this.locationSelected.coords_latitude = event.coords.lat;
      this.locationSelected.coords_longitude = event.coords.lng;
   }

   getLocations() {
      this.locations = [];
      this.locationSelected = new Location();
      this.locationSelected.user_id = 0;
      this.locationDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.locations = r.data as Location[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newLocation(content) {
      this.locationSelected = new Location();
      this.locationSelected.user_id = 0;
      this.openDialog(content);
   }

   editLocation(content) {
      if (typeof this.locationSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteLocation() {
      if (typeof this.locationSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.locationDataService.delete(this.locationSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getLocations();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.locationDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Locations.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.locationDataService.get().then( r => {
         const backupData = r as Location[];
         let output = 'id;coords_latitude;coords_longitude;date_time;user_id\n';
         backupData.forEach(element => {
            output += element.id; + element.coords_latitude + ';' + element.coords_longitude + ';' + element.date_time + ';' + element.user_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Locations.csv');
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
            this.locationDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.locationSelected.id === 'undefined') {
               this.locationDataService.post(this.locationSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getLocations();
               }).catch( e => console.log(e) );
            } else {
               this.locationDataService.put(this.locationSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getLocations();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}