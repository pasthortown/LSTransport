import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportStateRoutingModule } from './reportstate-routing.module';
import { ReportStateComponent } from './reportstate.component';
import { ReportStateService } from './../../../../services/CRUD/BASE/reportstate.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             ReportStateRoutingModule,
             FormsModule],
   declarations: [ReportStateComponent],
   providers: [
               NgbModal,
               ReportStateService
               ]
})
export class ReportStateModule {}