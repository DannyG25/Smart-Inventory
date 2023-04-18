import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private REST_API_SERVER = "http://localhost:3000/api/";
  constructor(private httpClient: HttpClient) {

   }
   private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Permite cualquier origen (para propósitos de prueba)
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Métodos HTTP permitidos
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', // Encabezados permitidos
    }),
    withCredentials: true // Habilitar envío de cookies
  };
  

  getTypeRequest(url: string) {
    console.log(this.REST_API_SERVER+url);
    return this.httpClient.get(this.REST_API_SERVER+url,{ withCredentials: true }).pipe(map(res => {
      return res;
    }));
  }

  getByIdTypeRequest(url: string, id:number) {
    console.log(this.REST_API_SERVER+url);
    return this.httpClient.get(this.REST_API_SERVER+url+'/'+id).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url: string, payload: any) {
    return this.httpClient.post(this.REST_API_SERVER+url, payload).pipe(map(res => {
      return res;
    }));
  }

  putTypeRequest(url: string, payload: any) {
    return this.httpClient.put(this.REST_API_SERVER+url, payload).pipe(map(res => {
      return res;
    }))
  }

  deleteTypeRequest(url: string, payload: any) {
    return this.httpClient.delete(this.REST_API_SERVER+url, payload).pipe(map(res => {
      return res;
    }))
  }
}