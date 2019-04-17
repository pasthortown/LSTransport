import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengerBinacleComponent } from './passengerbinacle.component';

const routes: Routes = [
   {
      path: '',
      component: PassengerBinacleComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class PassengerBinacleRoutingModule {}
