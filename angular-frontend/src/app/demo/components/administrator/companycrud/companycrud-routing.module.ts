import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanycrudComponent } from './companycrud.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CompanycrudComponent }
  ])],
  exports: [RouterModule]
}) 
export class CompanycrudRoutingModule { }
