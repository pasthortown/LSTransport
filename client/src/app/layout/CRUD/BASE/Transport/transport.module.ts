import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransportRoutingModule } from './transport-routing.module';
import { TransportComponent } from './transport.component';
import { TransportService } from './../../../../services/CRUD/BASE/transport.service';
import { environment } from 'src/environments/environment';
import { TransportDocumentService } from './../../../../services/CRUD/BASE/transportdocument.service';

@NgModule({
   imports: [CommonModule,
             TransportRoutingModule,
             FormsModule],
   declarations: [TransportComponent],
   providers: [
               NgbModal,
               TransportDocumentService,
               TransportService
               ]
})
export class TransportModule {}