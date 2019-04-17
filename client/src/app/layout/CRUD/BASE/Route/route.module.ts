import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouteRoutingModule } from './route-routing.module';
import { RouteComponent } from './route.component';
import { RouteService } from './../../../../services/CRUD/BASE/route.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             RouteRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [RouteComponent],
   providers: [
               NgbModal,
               RouteService
               ]
})
export class RouteModule {}