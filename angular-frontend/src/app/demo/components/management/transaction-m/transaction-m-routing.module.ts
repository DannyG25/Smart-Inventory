import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionMComponent } from './transaction-m.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: TransactionMComponent }
  ])],
  exports: [RouterModule]
}) 
export class TransactionMRoutingModule { }
