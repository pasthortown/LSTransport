import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';
import { DriverService } from './../../../../services/CRUD/BASE/driver.service';
import { environment } from 'src/environments/environment';
import { UserService } from './../../../../services/profile/user.service';

@NgModule({
   imports: [CommonModule,
             DriverRoutingModule,
             FormsModule],
   declarations: [DriverComponent],
   providers: [
               NgbModal,
               UserService,
               DriverService
               ]
})
export class DriverModule {}