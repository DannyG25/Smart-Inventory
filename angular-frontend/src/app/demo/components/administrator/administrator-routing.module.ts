import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  
  imports: [RouterModule.forChild([
    { path: 'company-crud', loadChildren: () => import ('./companycrud/companycrud.module').then(m => m.CompanycrudModule) },
    { path: '**', redirectTo: '/notfound' }

  ])],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
