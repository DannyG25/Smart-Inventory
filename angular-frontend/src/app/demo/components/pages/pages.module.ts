import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../../service/auth-interceptor.service';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  providers:[
    
  ]
})
export class PagesModule { }
