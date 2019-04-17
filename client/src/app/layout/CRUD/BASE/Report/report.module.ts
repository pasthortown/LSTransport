import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ReportService } from './../../../../services/CRUD/BASE/report.service';
import { environment } from 'src/environments/environment';
import { UserService } from './../../../../services/profile/user.service';
import { ReportStateService } from './../../../../services/CRUD/BASE/reportstate.service';
import { ReportResponseService } from './../../../../services/CRUD/BASE/reportresponse.service';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             ReportRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [ReportComponent],
   providers: [
               NgbModal,
               UserService,
               ReportStateService,
               ReportResponseService,
               ReportService
               ]
})
export class ReportModule {}