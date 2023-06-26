  import * as grpcWeb from 'grpc-web';
  import {
      Component,
      OnInit,
      ViewChild,
      ElementRef,
      AfterViewInit,
      OnDestroy,
  } from '@angular/core';
  import { Company } from 'src/app/demo/api/company';
  import { ApiService } from 'src/app/demo/service/api.service';
  import { Device } from 'src/app/demo/api/device';
  import { Binnacle } from 'src/app/demo/api/binnacle';
  import { User } from 'src/app/demo/api/users';
  import { MessageService } from 'primeng/api';
  import { Tax } from 'src/app/demo/api/tax';
  import { Subscription } from 'rxjs';
  import { EventsourceService } from 'src/app/demo/service/eventsource.service';
  import { HttpsourceService } from 'src/app/demo/service/httpsource.service'; 

  @Component({
      providers: [MessageService],
      templateUrl: './transaction-m.component.html',
      styleUrls: ['./transaction-m.component.scss'],
  })
  export class TransactionMComponent implements OnInit {
      // map:maplibregl.Map | undefined;
      companies?: Company[] = [];
      company?: Company = {};
      UserData?: User;
      devices?: Device[] = [];
      binnacles?: Binnacle[] = [];
      binnacle?: Binnacle = {};
      cols: any[] = [];
      selectedCompanies: Company[] = [];
      filteredCountries: any[] = [];
      countries: any[] = [];
      date?: Date;
      selectedCountry: string | undefined;
      CompanyData?: Company;
      taxs?: Tax[];
      selectedTax?: Tax;
      users: User[] = [];
      selectedUser?: User;
      private subscription!: Subscription;
      eventData: any;
  
      constructor(private _api: ApiService, private eventSourceService: EventsourceService, private httpsourceservice: HttpsourceService) {
      }

      ngOnInit(): void {
          this._api.getTypeRequest('taxs').subscribe(
              (data: any) => {
                  this.taxs = data;
              },
              (err) => {
                  console.log(err);
              }
          );
          this._api.getTypeRequest('users').subscribe(
              (data: any) => {
                  this.users = data;
              },
              (err) => {
                  console.log(err);
              }
          );
          this.date = new Date();
          this.countries = [
              { name: 'Australia', code: 'AU' },
              { name: 'Brazil', code: 'BR' },
              { name: 'China', code: 'CN' },
              { name: 'Egypt', code: 'EG' },
              { name: 'France', code: 'FR' },
              { name: 'Germany', code: 'DE' },
              { name: 'India', code: 'IN' },
              { name: 'Japan', code: 'JP' },
              { name: 'Spain', code: 'ES' },
              { name: 'United States', code: 'US' },
          ];

        //   this.eventSourceService.startEventSource('http://localhost:3000/api/antenna/stream');
        //   this.subscription = this.eventSourceService.getServerSentEvent('http://localhost:3000/api/antenna/stream')
        //   .subscribe(
        //     event => console.log(event),
        //     error => console.error(error)
        //   );
        

        const url = 'http://localhost:3000/api/antenna/stream';
        this.httpsourceservice.startEventSource(url);

        this.subscription = this.httpsourceservice.getServerSentEvents<any>('message').subscribe(
        (data: any) => {
            this.eventData = data;
            console.log(this.eventData)
            // Realiza las operaciones necesarias con los datos recibidos en tiempo real
        },
        (error) => {
            console.error('Error al recibir los eventos SSE', error);
        }
        );
    
      }

    //   ngOnDestroy() {
    //     this.eventSourceService.closeEventSource();
    //     this.subscription.unsubscribe();
    //   }
    ngOnDestroy(): void {
        if (this.subscription) {
          this.subscription.unsubscribe();
          this.httpsourceservice.closeEventSource();
        }
      }
  }