import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRolAssigmentComponent } from './accountrolassigment.component';

const routes: Routes = [
   {
      path: '',
      component: AccountRolAssigmentComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class AccountRolAssigmentRoutingModule {}
