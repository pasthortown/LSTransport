import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransportDocumentAttachmentRoutingModule } from './transportdocumentattachment-routing.module';
import { TransportDocumentAttachmentComponent } from './transportdocumentattachment.component';
import { TransportDocumentAttachmentService } from './../../../../services/CRUD/BASE/transportdocumentattachment.service';
import { environment } from 'src/environments/environment';
import { TransportDocumentService } from './../../../../services/CRUD/BASE/transportdocument.service';

@NgModule({
   imports: [CommonModule,
             TransportDocumentAttachmentRoutingModule,
             FormsModule],
   declarations: [TransportDocumentAttachmentComponent],
   providers: [
               NgbModal,
               TransportDocumentService,
               TransportDocumentAttachmentService
               ]
})
export class TransportDocumentAttachmentModule {}