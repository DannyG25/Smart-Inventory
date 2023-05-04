import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkComponent } from './mark.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MarkComponent }
	])],
	exports: [RouterModule]
})
export class MarkRoutingModule { }
