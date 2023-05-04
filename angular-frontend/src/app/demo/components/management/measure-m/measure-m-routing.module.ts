import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MeasureMComponent } from './measure-m.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: MeasureMComponent }
  ])],
  exports: [RouterModule]
}) 
export class MeasureMRoutingModule { }
