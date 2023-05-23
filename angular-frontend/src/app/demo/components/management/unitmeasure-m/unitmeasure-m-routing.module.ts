import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnitmeasureMComponent } from './unitmeasure-m.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: UnitmeasureMComponent }
  ])],
  exports: [RouterModule]
}) 
export class UnitmeasureMRoutingModule { }
