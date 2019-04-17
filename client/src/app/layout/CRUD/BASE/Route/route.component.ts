import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { RouteService } from './../../../../services/CRUD/BASE/route.service';
import { Route } from './../../../../models/BASE/Route';

@Component({
   selector: 'app-route',
   templateUrl: './route.component.html',
   styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {
   routes: Route[] = [];
   routeSelected: Route = new Route();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private routeDataService: RouteService) {}

   ngOnInit() {
      this.goToPage(1);
   }

   selectRoute(route: Route) {
      this.routeSelected = route;
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getRoutes();
   }

   getRoutes() {
      this.routes = [];
      this.routeSelected = new Route();
      this.routeDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.routes = r.data as Route[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newRoute(content) {
      this.routeSelected = new Route();
      this.openDialog(content);
   }

   editRoute(content) {
      if (typeof this.routeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteRoute() {
      if (typeof this.routeSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.routeDataService.delete(this.routeSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getRoutes();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.routeDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Routes.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.routeDataService.get().then( r => {
         const backupData = r as Route[];
         let output = 'id;name;description\n';
         backupData.forEach(element => {
            output += element.id; + element.name + ';' + element.description + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_Routes.csv');
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
            this.routeDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true , size: 'lg' }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.routeSelected.id === 'undefined') {
               this.routeDataService.post(this.routeSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getRoutes();
               }).catch( e => console.log(e) );
            } else {
               this.routeDataService.put(this.routeSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getRoutes();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}