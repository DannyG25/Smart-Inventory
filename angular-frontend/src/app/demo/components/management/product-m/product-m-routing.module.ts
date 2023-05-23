import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductMComponent } from './product-m.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ProductMComponent }
  ])],
  exports: [RouterModule]
}) 
export class ProductMRoutingModule { }
