import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private cookieService: CookieService
  ) { }
  getUserDetails() {
    // return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null;
  }

  setDataInCookie(variableName: string, data: string) {
    // 'token' es el nombre de la cookie, 'tu_token_aqui' es el valor del token y { expires: 1 } indica que la cookie expirará en 1 día

    this.cookieService.set(variableName, data, { expires: 1 });
  }

  getCookie() {
    return this.cookieService.get('Authorization')
  }

  clearCookies() {
    this.cookieService.delete('Authorization');
  }
}
