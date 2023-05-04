import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeviceMComponent } from './device-m.component';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: DeviceMComponent }
  ])],
  exports: [RouterModule]
}) 
export class DeviceMRoutingModule { }
