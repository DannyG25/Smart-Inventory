import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryMComponent } from './inventory-m.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: InventoryMComponent }
  ])],
  exports: [RouterModule]
}) 
export class InventoryMRoutingModule { }
