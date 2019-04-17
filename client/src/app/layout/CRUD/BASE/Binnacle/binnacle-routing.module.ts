import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinnacleComponent } from './binnacle.component';

const routes: Routes = [
   {
      path: '',
      component: BinnacleComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class BinnacleRoutingModule {}
