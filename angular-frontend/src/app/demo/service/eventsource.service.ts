import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsourceService {
  private eventSource!: EventSource;

  startEventSource(url: string): void {
    this.eventSource = new EventSource(url);
  }

  getServerSentEvent(url: string) {
    return new Observable(observer => {
      this.eventSource.onmessage = event => {
        observer.next(event);
      };

      this.eventSource.onerror = error => {
        if (this.eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          this.eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      };
    });
  }

  closeEventSource() {
    this.eventSource.close();
  }
}
