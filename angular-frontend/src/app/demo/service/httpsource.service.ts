import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpsourceService {

  private eventSource!: EventSource;

  startEventSource(url: string): void {
    this.eventSource = new EventSource(url);
  }

  getServerSentEvents<T>(eventType: string): Observable<T> {
    return new Observable(observer => {
      this.eventSource.addEventListener(eventType, (event: MessageEvent) => {
        observer.next(JSON.parse(event.data) as T);
      });

      this.eventSource.onerror = error => {
        if (this.eventSource.readyState === 0) {
          // console.log('La conexión SSE ha sido cerrada por el servidor.');
          // this.eventSource.close();
          // observer.complete();
        } else {
          observer.error('Error en EventSource: ' + error);
        }
      };
    });
  }

  closeEventSource() {
    this.eventSource.close();
  }
}
