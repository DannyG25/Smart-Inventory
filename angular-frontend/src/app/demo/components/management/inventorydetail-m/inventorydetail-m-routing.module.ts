import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventorydetailMComponent } from './inventorydetail-m.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: InventorydetailMComponent }
  ])],
  exports: [RouterModule]
}) 
export class InventorydetailMRoutingModule { }
