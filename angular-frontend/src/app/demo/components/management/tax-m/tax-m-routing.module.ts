import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaxMComponent } from './tax-m.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: TaxMComponent }
  ])],
  exports: [RouterModule]
}) 
export class TaxMRoutingModule { }
