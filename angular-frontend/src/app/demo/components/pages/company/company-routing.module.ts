import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';



@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: CompanyComponent }
	])],
	exports: [RouterModule]
})
export class CompanyRoutingModule { }
