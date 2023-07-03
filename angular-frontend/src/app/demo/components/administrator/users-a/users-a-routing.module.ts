import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersAComponent } from './users-a.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: UsersAComponent }
  ])],
  exports: [RouterModule]
}) 
export class UsersARoutingModule { }
