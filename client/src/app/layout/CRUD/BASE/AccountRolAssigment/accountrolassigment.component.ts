import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver/FileSaver';
import { AccountRolAssigmentService } from './../../../../services/CRUD/BASE/accountrolassigment.service';
import { AccountRolAssigment } from './../../../../models/BASE/AccountRolAssigment';
import { AccountRolService } from './../../../../services/CRUD/BASE/accountrol.service';
import { AccountRol } from './../../../../models/BASE/AccountRol';


@Component({
   selector: 'app-accountrolassigment',
   templateUrl: './accountrolassigment.component.html',
   styleUrls: ['./accountrolassigment.component.scss']
})
export class AccountRolAssigmentComponent implements OnInit {
   account_rol_assigments: AccountRolAssigment[] = [];
   account_rol_assigmentSelected: AccountRolAssigment = new AccountRolAssigment();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   account_rols: AccountRol[] = [];
   constructor(
               private modalService: NgbModal,
               private toastr: ToastrManager,
               private account_rolDataService: AccountRolService,
               private account_rol_assigmentDataService: AccountRolAssigmentService) {}

   ngOnInit() {
      this.goToPage(1);
      this.getAccountRol();
   }

   selectAccountRolAssigment(account_rol_assigment: AccountRolAssigment) {
      this.account_rol_assigmentSelected = account_rol_assigment;
   }

   getAccountRol() {
      this.account_rols = [];
      this.account_rolDataService.get().then( r => {
         this.account_rols = r as AccountRol[];
      }).catch( e => console.log(e) );
   }

   goToPage(page: number) {
      if ( page < 1 || page > this.lastPage ) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getAccountRolAssigments();
   }

   getAccountRolAssigments() {
      this.account_rol_assigments = [];
      this.account_rol_assigmentSelected = new AccountRolAssigment();
      this.account_rol_assigmentSelected.account_rol_id = 0;
      this.account_rol_assigmentDataService.get_paginate(this.recordsByPage, this.currentPage).then( r => {
         this.account_rol_assigments = r.data as AccountRolAssigment[];
         this.lastPage = r.last_page;
      }).catch( e => console.log(e) );
   }

   newAccountRolAssigment(content) {
      this.account_rol_assigmentSelected = new AccountRolAssigment();
      this.account_rol_assigmentSelected.account_rol_id = 0;
      this.openDialog(content);
   }

   editAccountRolAssigment(content) {
      if (typeof this.account_rol_assigmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.openDialog(content);
   }

   deleteAccountRolAssigment() {
      if (typeof this.account_rol_assigmentSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.account_rol_assigmentDataService.delete(this.account_rol_assigmentSelected.id).then( r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getAccountRolAssigments();
      }).catch( e => console.log(e) );
   }

   backup() {
      this.account_rol_assigmentDataService.getBackUp().then( r => {
         const backupData = r;
         const blob = new Blob([JSON.stringify(backupData)], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_AccountRolAssigments.json');
      }).catch( e => console.log(e) );
   }

   toCSV() {
      this.account_rol_assigmentDataService.get().then( r => {
         const backupData = r as AccountRolAssigment[];
         let output = 'id;account_rol_id\n';
         backupData.forEach(element => {
            output += element.id; + element.account_rol_id + '\n';
         });
         const blob = new Blob([output], { type: 'text/plain' });
         const fecha = new Date();
         saveAs(blob, fecha.toLocaleDateString() + '_AccountRolAssigments.csv');
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
            this.account_rol_assigmentDataService.masiveLoad(newData).then( r => {
               this.goToPage(this.currentPage);
            }).catch( e => console.log(e) );
         };
      }
   }

   openDialog(content) {
      this.modalService.open(content, { centered: true }).result.then(( response => {
         if ( response === 'Guardar click' ) {
            if (typeof this.account_rol_assigmentSelected.id === 'undefined') {
               this.account_rol_assigmentDataService.post(this.account_rol_assigmentSelected).then( r => {
                  this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
                  this.getAccountRolAssigments();
               }).catch( e => console.log(e) );
            } else {
               this.account_rol_assigmentDataService.put(this.account_rol_assigmentSelected).then( r => {
                  this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
                  this.getAccountRolAssigments();
               }).catch( e => console.log(e) );
            }
         }
      }), ( r => {}));
   }
}