import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { BinnacleService } from './../../../../services/CRUD/BASE/binnacle.service';
import { Binnacle } from './../../../../models/BASE/Binnacle';
import { TransportService } from './../../../../services/CRUD/BASE/transport.service';
import { Transport } from './../../../../models/BASE/Transport';

import { PassengerBinacleService } from './../../../../services/CRUD/BASE/passengerbinacle.service';
import { PassengerBinacle } from './../../../../models/BASE/PassengerBinacle';

import { RouteService } from './../../../../services/CRUD/BASE/route.service';
import { Route } from './../../../../models/BASE/Route';

import { DriverService } from './../../../../services/CRUD/BASE/driver.service';
import { Driver } from './../../../../models/BASE/Driver';

import { ReportService } from './../../../../services/CRUD/BASE/report.service';
import { Report } from './../../../../models/BASE/Report';


@Component({
   selector: 'app-binnacle',
   templateUrl: './binnacle.component.html',
   styleUrls: ['./binnacle.component.scss']
})
export class BinnacleComponent implements OnInit {
   binnacles: Binnacle[] = [];
   binnacleSelected: Binnacle = new Binnacle();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   transports: Transport[] = [];
   passenger_binacles: PassengerBinacle[] = [];
   passenger_binacles_binnacleSelectedId: number;
   routes: Route[] = [];
   drivers: Driver[] = [];
   reports: Report[] = [];
   reports_binnacleSelectedId: number;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private transportDataService: TransportService,
               private passenger_binacleDataService: PassengerBinacleService,
               private routeDataService: RouteService,
               private driverDataService: DriverService,
               private reportDataService: ReportService,
               private binnacleDataService: BinnacleService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getTransport();
      this.getPassengerBinacle();
      this.getRoute();
      this.getDriver();
      this.getReport();
   }

   selectBinnacle(binnacle: Binnacle) {
      this.binnacleSelected = binnacle;
   }

   getTransport() {
      this.transports = [];
      this.transportDataService.get().then( r => {
         this.transports = r as Transport[];
      }).catch( e => console.log(e) );
   }

   getPassengerBinacle() {
      this.passenger_binacles = [];
      this.passenger_binacleDataService.get().then( r => {
         this.passenger_binacles = r as PassengerBinacle[];
      }).catch( e => console.log(e) );
   }

   getPassengerBinaclesOnBinnacle() {
      this.binnacleSelected.passenger_binacles_on_binnacle = [];
      this.binnacleDataService.get(this.binnacleSelected.id).then( r => {
         this.binnacleSelected.passenger_binacles_on_binnacle = r.attach[0].passenger_binacles_on_binnacle as PassengerBinacle[];
      }).catch( e => console.log(e) );
   }

   getRoute() {
      this.routes = [];
      this.routeDataService.get().then( r => {
         this.routes = r as Route[];
      }).catch( e => console.log(e) );
   }

   getDriver() {
      this.drivers = [];
      this.driverDataService.get().then( r => {
         this.drivers = r as Driver[];
      }).catch( e => console.log(e) );
   }

   getReport() {
      this.reports = [];
      this.reportDataService.get().then( r => {
         this.reports = r as Report[];
      }).catch( e => console.log(e) );
   }

   getReportsOnBinnacle() {
      this.binnacleSelected.reports_on_binnacle = [];
      this.binnacleDataService.get(this.binnacleSelected.id).then( r => {
         this.binnacleSelected.reports_on_binnacle = r.attach[0].reports_on_binnacle as Report[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getBinnacles();
   }

   address_start_mapEvent(event) {
      this.binnacleSelected.address_start_map_latitude = event.coords.lat;
      this.binnacleSelected.address_start_map_longitude = event.coords.lng;
   }

   address_end_mapEvent(event) {
      this.binnacleSelected.address_end_map_latitude = event.coords.lat;
      this.binnacleSelected.address_end_map_longitude = event.coords.lng;
   }

   getBinnacles() {
      this.binnacles = [];
      this.binnacleSelected = new Binnacle();
      this.binnacleSelected.transport_id = 0;
      this.passenger_binacles_binnacleSelectedId = 0;
      this.binnacleSelected.route_id = 0;
      this.binnacleSelected.driver_id = 0;
      this.reports_binnacleSelectedId = 0;
      this.binnacleDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.binnacles = r.data as Binnacle[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newBinnacle(content) {
      this.binnacleSelected = new Binnacle();
      this.binnacleSelected.transport_id = 0;
      this.passenger_binacles_binnacleSelectedId = 0;
      this.binnacleSelected.route_id = 0;
      this.binnacleSelected.driver_id = 0;
      this.reports_binnacleSelectedId = 0;
      this.openDialog(content);
   }

   editBinnacle(content) {
      if ( typeof this.binnacleSelected.passenger_binacles_on_binnacle === 'undefined' ) {
         this.binnacleSelected.passenger_binacles_on_binnacle = [];
      }
      if ( typeof this.binnacleSelected.reports_on_binnacle === 'undefined' ) {
         this.binnacleSelected.reports_on_binnacle = [];
      }
      if (typeof this.binnacleSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.getPassengerBinaclesOnBinnacle();
      this.passenger_binacles_binnacleSelectedId = 0;
      this.getReportsOnBinnacle();
      this.reports_binnacleSelectedId = 0;
      this.openDialog(content);
   }

   deleteBinnacle() {
      if (typeof this.binnacleSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.binnacleDataService.delete(this.binnacleSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getBinnacles();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.binnacleDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Binnacles.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.binnacleDataService.get().then( r => {
         const backupData = r as Binnacle[];
         let output = 'id;start;end;address_start_map_latitude;address_start_map_longitude;address_end_map_latitude;address_end_map_longitude;address_start;address_end;oddometer_start;oddometer_end;transport_id;route_id;driver_id\n';
         backupData.forEach(element => {
            output += element.id; + element.start + ';' + element.end + ';' + element.address_start_map_latitude + ';' + element.address_start_map_longitude + ';' + element.address_end_map_latitude + ';' + element.address_end_map_longitude + ';' + element.address_start + ';' + element.address_end + ';' + element.oddometer_start + ';' + element.oddometer_end + ';' + element.transport_id + ';' + element.route_id + ';' + element.driver_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Binnacles.csv');
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
            this.binnacleDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   selectPassengerBinacle(passenger_binacle: PassengerBinacle) {
      this.passenger_binacles_binnacleSelectedId = passenger_binacle.id;
   }

   addPassengerBinacle() {
      if (this.passenger_binacles_binnacleSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      this.passenger_binacles.forEach(passenger_binacle => {
         if (passenger_binacle.id == this.passenger_binacles_binnacleSelectedId) {
            let existe = false;
            this.binnacleSelected.passenger_binacles_on_binnacle.forEach(element => {
               if (element.id == passenger_binacle.id) {
                  existe = true;
               }
            });
            if (!existe) {
               this.binnacleSelected.passenger_binacles_on_binnacle.push(passenger_binacle);
               this.passenger_binacles_binnacleSelectedId = 0;
            } else {
               this.toastr.errorToastr('El registro ya existe.', 'Error');
            }
         }
      });
   }

   removePassengerBinacle() {
      if (this.passenger_binacles_binnacleSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      const newPassengerBinacles: PassengerBinacle[] = [];
      let eliminado = false;
      this.binnacleSelected.passenger_binacles_on_binnacle.forEach(passenger_binacle => {
         if (passenger_binacle.id !== this.passenger_binacles_binnacleSelectedId) {
            newPassengerBinacles.push(passenger_binacle);
         } else {
            eliminado = true;
         }
      });
      if (!eliminado) {
         this.toastr.errorToastr('Registro no encontrado.', 'Error');
         return;
      }
      this.binnacleSelected.passenger_binacles_on_binnacle = newPassengerBinacles;
      this.passenger_binacles_binnacleSelectedId = 0;
   }

   selectReport(report: Report) {
      this.reports_binnacleSelectedId = report.id;
   }

   addReport() {
      if (this.reports_binnacleSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      this.reports.forEach(report => {
         if (report.id == this.reports_binnacleSelectedId) {
            let existe = false;
            this.binnacleSelected.reports_on_binnacle.forEach(element => {
               if (element.id == report.id) {
                  existe = true;
               }
            });
            if (!existe) {
               this.binnacleSelected.reports_on_binnacle.push(report);
               this.reports_binnacleSelectedId = 0;
            } else {
               this.toastr.errorToastr('El registro ya existe.', 'Error');
            }
         }
      });
   }

   removeReport() {
      if (this.reports_binnacleSelectedId === 0) {
         this.toastr.errorToastr('Seleccione un registro.', 'Error');
         return;
      }
      const newReports: Report[] = [];
      let eliminado = false;
      this.binnacleSelected.reports_on_binnacle.forEach(report => {
         if (report.id !== this.reports_binnacleSelectedId) {
            newReports.push(report);
         } else {
            eliminado = true;
         }
      });
      if (!eliminado) {
         this.toastr.errorToastr('Registro no encontrado.', 'Error');
         return;
      }
      this.binnacleSelected.reports_on_binnacle = newReports;
      this.reports_binnacleSelectedId = 0;
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.binnacleSelected.id === 'undefined') {
               this.binnacleDataService.post(this.binnacleSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getBinnacles();
               }).catch( e => console.log(e) );
            } else {
               this.binnacleDataService.put(this.binnacleSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getBinnacles();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}