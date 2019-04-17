import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransportDocumentRoutingModule } from './transportdocument-routing.module';
import { TransportDocumentComponent } from './transportdocument.component';
import { TransportDocumentService } from './../../../../services/CRUD/BASE/transportdocument.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             TransportDocumentRoutingModule,
             FormsModule],
   declarations: [TransportDocumentComponent],
   providers: [
               NgbModal,
               TransportDocumentService
               ]
})
export class TransportDocumentModule {}