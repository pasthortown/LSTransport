import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountRolAssigmentRoutingModule } from './accountrolassigment-routing.module';
import { AccountRolAssigmentComponent } from './accountrolassigment.component';
import { AccountRolAssigmentService } from './../../../../services/CRUD/BASE/accountrolassigment.service';
import { environment } from 'src/environments/environment';
import { AccountRolService } from './../../../../services/CRUD/BASE/accountrol.service';

@NgModule({
   imports: [CommonModule,
             AccountRolAssigmentRoutingModule,
             FormsModule],
   declarations: [AccountRolAssigmentComponent],
   providers: [
               NgbModal,
               AccountRolService,
               AccountRolAssigmentService
               ]
})
export class AccountRolAssigmentModule {}