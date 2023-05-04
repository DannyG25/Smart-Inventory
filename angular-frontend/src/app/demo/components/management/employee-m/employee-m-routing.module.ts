import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeMComponent } from './employee-m.component';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: EmployeeMComponent }
  ])],
  exports: [RouterModule]
}) 
export class EmployeeMRoutingModule { }
