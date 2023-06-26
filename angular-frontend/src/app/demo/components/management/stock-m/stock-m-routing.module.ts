import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockMComponent } from './stock-m.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: StockMComponent }
  ])],
  exports: [RouterModule]
}) 
export class StockMRoutingModule { }
