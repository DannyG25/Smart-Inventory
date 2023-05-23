import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BinnacleComponent } from './binnacle.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: BinnacleComponent }
  ])],
  exports: [RouterModule]
}) 
export class BinnacleRoutingModule { }
