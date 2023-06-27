import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionslistMComponent } from './transactionslist-m.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: TransactionslistMComponent }
  ])],
  exports: [RouterModule]
}) 
export class TransactionslistMRoutingModule { }
