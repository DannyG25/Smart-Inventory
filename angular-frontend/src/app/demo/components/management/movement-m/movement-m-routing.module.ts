import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovementMComponent } from './movement-m.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: MovementMComponent }
  ])],
  exports: [RouterModule]
}) 
export class MovementMRoutingModule { }
