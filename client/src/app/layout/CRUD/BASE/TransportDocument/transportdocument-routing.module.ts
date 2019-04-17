import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportDocumentComponent } from './transportdocument.component';

const routes: Routes = [
   {
      path: '',
      component: TransportDocumentComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TransportDocumentRoutingModule {}
