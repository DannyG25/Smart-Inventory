import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationComponent } from './location.component';



@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: LocationComponent }
	])],
	exports: [RouterModule]
})
export class LocationRoutingModule { }
