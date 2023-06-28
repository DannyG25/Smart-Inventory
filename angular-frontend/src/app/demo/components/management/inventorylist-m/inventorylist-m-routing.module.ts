import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventorylistMComponent } from './inventorylist-m.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: InventorylistMComponent }
  ])],
  exports: [RouterModule]
}) 
export class InventorylistMRoutingModule { }
