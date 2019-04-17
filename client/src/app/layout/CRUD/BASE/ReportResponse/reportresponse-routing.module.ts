import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportResponseComponent } from './reportresponse.component';

const routes: Routes = [
   {
      path: '',
      component: ReportResponseComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ReportResponseRoutingModule {}
