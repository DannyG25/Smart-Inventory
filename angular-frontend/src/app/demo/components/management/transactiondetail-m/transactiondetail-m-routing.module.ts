import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactiondetailMComponent } from './transactiondetail-m.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: TransactiondetailMComponent }
  ])],
  exports: [RouterModule]
}) 
export class TransactiondetailMRoutingModule { }
