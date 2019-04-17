import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportDocumentAttachmentComponent } from './transportdocumentattachment.component';

const routes: Routes = [
   {
      path: '',
      component: TransportDocumentAttachmentComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TransportDocumentAttachmentRoutingModule {}
