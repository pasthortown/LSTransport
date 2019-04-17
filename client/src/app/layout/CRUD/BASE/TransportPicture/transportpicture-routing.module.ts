import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportPictureComponent } from './transportpicture.component';

const routes: Routes = [
   {
      path: '',
      component: TransportPictureComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TransportPictureRoutingModule {}
