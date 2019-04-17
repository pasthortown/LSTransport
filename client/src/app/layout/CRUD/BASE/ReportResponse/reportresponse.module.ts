import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportResponseRoutingModule } from './reportresponse-routing.module';
import { ReportResponseComponent } from './reportresponse.component';
import { ReportResponseService } from './../../../../services/CRUD/BASE/reportresponse.service';
import { environment } from 'src/environments/environment';
import { UserService } from './../../../../services/profile/user.service';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             ReportResponseRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [ReportResponseComponent],
   providers: [
               NgbModal,
               UserService,
               ReportResponseService
               ]
})
export class ReportResponseModule {}