import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable, Subject, of, throwError } from 'rxjs';

import { HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(
    private router: Router,
    private _auth: AuthenticationService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') }).clone({
      setHeaders: {
        Authorization: this._auth.getCookie(),
        
      }
    });

    return next.handle(request)
  }

  //   const headers = request.headers
  //     .set('Access-Control-Allow-Origin', '*') // Permite cualquier origen. Reemplaza '*' con tu dominio o dominios permitidos.
  //     .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE') // Especifica los métodos HTTP permitidos.
  //     .set('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Especifica los encabezados permitidos.
  //     .set('Content-Type', 'application/json') // Establece el tipo de contenido a JSON. Puedes cambiarlo según tus necesidades.
      


  //   const token =this._auth.getCookie()
  //   if (token !== null && token !== undefined) { 
  //       headers.set('Authorization', token); // Agrega el token de acceso en el encabezado de autorización. Reemplaza 'tuToken' con el valor real del token.)
  //     }

    
  //   // Clona la solicitud HTTP y asigna los encabezados modificados
  //   const clonedReq = request.clone({ headers, withCredentials: true }); // Habilita el envío de cookies en la solicitud.

  //   // Continúa con la solicitud HTTP modificada
  //   return next.handle(clonedReq);
  // }
}
