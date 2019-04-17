import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountRolRoutingModule } from './accountrol-routing.module';
import { AccountRolComponent } from './accountrol.component';
import { AccountRolService } from './../../../../services/CRUD/BASE/accountrol.service';
import { environment } from 'src/environments/environment';
import { UserService } from './../../../../services/profile/user.service';

@NgModule({
   imports: [CommonModule,
             AccountRolRoutingModule,
             FormsModule],
   declarations: [AccountRolComponent],
   providers: [
               NgbModal,
               UserService,
               AccountRolService
               ]
})
export class AccountRolModule {}