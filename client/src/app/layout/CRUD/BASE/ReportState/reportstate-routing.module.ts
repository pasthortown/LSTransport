import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportStateComponent } from './reportstate.component';

const routes: Routes = [
   {
      path: '',
      component: ReportStateComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ReportStateRoutingModule {}
