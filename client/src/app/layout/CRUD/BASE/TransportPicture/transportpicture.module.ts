import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransportPictureRoutingModule } from './transportpicture-routing.module';
import { TransportPictureComponent } from './transportpicture.component';
import { TransportPictureService } from './../../../../services/CRUD/BASE/transportpicture.service';
import { environment } from 'src/environments/environment';
import { TransportService } from './../../../../services/CRUD/BASE/transport.service';

@NgModule({
   imports: [CommonModule,
             TransportPictureRoutingModule,
             FormsModule],
   declarations: [TransportPictureComponent],
   providers: [
               NgbModal,
               TransportService,
               TransportPictureService
               ]
})
export class TransportPictureModule {}