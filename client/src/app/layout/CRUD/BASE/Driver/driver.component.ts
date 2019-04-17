import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { DriverService } from './../../../../services/CRUD/BASE/driver.service';
import { Driver } from './../../../../models/BASE/Driver';
import { UserService } from './../../../../services/profile/user.service';
import { User } from './../../../../models/profile/User';


@Component({
   selector: 'app-driver',
   templateUrl: './driver.component.html',
   styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
   drivers: Driver[] = [];
   driverSelected: Driver = new Driver();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   users: User[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private userDataService: UserService,
               private driverDataService: DriverService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getUser();
   }

   selectDriver(driver: Driver) {
      this.driverSelected = driver;
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
      this.getDrivers();
   }

   getDrivers() {
      this.drivers = [];
      this.driverSelected = new Driver();
      this.driverSelected.user_id = 0;
      this.driverDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.drivers = r.data as Driver[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newDriver(content) {
      this.driverSelected = new Driver();
      this.driverSelected.user_id = 0;
      this.openDialog(content);
   }

   editDriver(content) {
      if (typeof this.driverSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteDriver() {
      if (typeof this.driverSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.driverDataService.delete(this.driverSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getDrivers();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.driverDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Drivers.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.driverDataService.get().then( r => {
         const backupData = r as Driver[];
         let output = 'id;phone_number;user_id\n';
         backupData.forEach(element => {
            output += element.id; + element.phone_number + ';' + element.user_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Drivers.csv');
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
            this.driverDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.driverSelected.id === 'undefined') {
               this.driverDataService.post(this.driverSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getDrivers();
               }).catch( e => console.log(e) );
            } else {
               this.driverDataService.put(this.driverSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getDrivers();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}