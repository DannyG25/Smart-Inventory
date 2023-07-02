import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Transaction } from 'src/app/demo/api/transaction';
import { Binnacle } from 'src/app/demo/api/binnacle';
import { Router } from '@angular/router';
import { User } from 'src/app/demo/api/users';
import { Company } from 'src/app/demo/api/company';
import { Device } from 'src/app/demo/api/device';
import * as L from 'leaflet';
import { Map, NavigationControl, Marker, Popup } from 'maplibre-gl';
import { HttpClient } from '@angular/common/http';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

declare var google: any;


@Component({
    providers: [MessageService],
    templateUrl: './transactionslist-m.component.html',
    styleUrls: ['./transactionslist-m.component.scss'],
})
export class TransactionslistMComponent implements OnInit, AfterViewInit {
    transactionDialog: boolean = false;
    editTransactionDialog: boolean = false;

    deleteTransactionDialog: boolean = false;

    deleteTransactionsDialog: boolean = false;
    updateStatusDialog: boolean = false;
    transactions: Transaction[] = [];
    transaction: Transaction = {
        Transaction_details: [],
    };
    userData?: User;
    selectedTransactions: Transaction[] = [];
    selectedStatus: any;
    submitted: boolean = false;

    cols: any[] = [];

    statuses: SelectItem[] = [];

    rowsPerPageOptions = [5, 10, 20];

    companies?: Company[] = [];
    company?: Company = {};
    UserData?: User;
    devices?: Device[] = [];
    binnacles?: Binnacle[] = [];
    binnacle?: Binnacle = {};
    navigationControl = new NavigationControl({});
    CompanyData?: Company;
    mapa: any;
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();

    @ViewChild(GoogleMap) map!: GoogleMap;    private mapContainer!: ElementRef<HTMLElement>;
    locations: { name: string, lat: number, lng: number }[] = []; 
    mainlocation: { name: string; lat: number; lng: number; }[] = []; 
     constructor(
        private _api: ApiService,
        private messageService: MessageService,
        private router: Router,
        private http: HttpClient // añadir esto
    ) {}

    ngOnInit() {
        
        this._api.getTypeRequest('users/validate').subscribe(
            (user: any) => {
                this.userData = user;
                this._api.getTypeRequest('transactions').subscribe(
                    (data: any) => {
                        this.transactions = data;
                        this.loadCompanyMap();

                    },
                    (err) => {
                    }
                );
            },
            (err: any) => {
            }
        );

        this.cols = [{ field: 'transaction', header: 'Transaction' }];


    }
    ngAfterViewInit(): void {
        // this.drawRoute();
      }


    deleteSelectedTransactions() {
        this.deleteTransactionsDialog = true;
    }

    viewBinnacles(transaction: Transaction) {
        this.router.navigate(['/management/binnacle'], {
            queryParams: { id: transaction.ID },
        });
    }

    updateStatus(transaction: Transaction) {
        this.updateStatusDialog = true;
        this.transaction = { ...transaction };
      }

      confirmUpdate() {
        this.locations=[]
        this.mainlocation=[]
        this.binnacle={}
        this.companies=[]
        this.transactions=[]
        this.updateStatusDialog = false;
        this.transaction.Tran_status="done"
        this._api.putTypeRequest('transactions/status', this.transaction).subscribe((res: any) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Status Update', life: 3000 });

          this._api.getTypeRequest('transactions').subscribe(
            (data: any) => {
                this.transactions = data;
                this.loadCompanyMap();

            },
            (err) => {
                console.log(err)
            }
        );
        }, err => {
          console.log(err)
        });
        this.transaction = {};
    
      }

    confirmDeleteSelected() {
        this.deleteTransactionsDialog = false;
        console.log(this.selectedTransactions);
        for (let selectTransaction of this.selectedTransactions) {
            this._api
                .deleteTypeRequest('transactions', selectTransaction.ID)
                .subscribe(
                    (res: any) => {},
                    (err) => {
                    }
                );
        }
        // this._api.getTypeRequest('transactions').subscribe((data: any) => this.transactions = data);
        this.transactions = this.transactions.filter(
            (val) => !this.selectedTransactions.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Transactions Deleted',
            life: 3000,
        });

        this.selectedTransactions = [];
    }

    hideDialog() {
        this.transactionDialog = false;
        this.submitted = false;
        this.editTransactionDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    loadCompanyMap() {
        

        
        this.CompanyData = this.userData?.Company;
        console.log(this.CompanyData)
        for (let device of this.CompanyData?.Devices ??
            []) {
            // for (let binnacle of device.Binnacles ?? []) {
            let binnacles = device.Binnacles ?? [];
            this.binnacle = binnacles[binnacles.length - 1];
            console.log(this.binnacle);
            this.binnacle.Bin_lenght
            if(this.binnacle.Bin_description && this.binnacle.Bin_latitude && this.binnacle.Bin_lenght) {
                this.mainlocation.push({
                  name: this.binnacle.Bin_description,
                  lat: this.binnacle.Bin_latitude,
                  lng: this.binnacle.Bin_lenght
                });
              }
            
        }
        console.log("transactions")
        console.log(this.transactions)
        this.transactions.forEach((item) => {
            // console.log(item);
            if (item.Users2?.Company && item.Tran_status==="not_done") {
                this.companies?.push(item.Users2.Company);
               
            }
        });
        console.log(this.companies);
            if (this.companies) {
                
                for (let company of this.companies) {
                    for (let device of company.Devices ?? []) {
                        for (let binnacle of device.Binnacles ?? []) {
                            if(binnacle.Bin_description && binnacle.Bin_latitude && binnacle.Bin_lenght) {
                                this.locations.push({
                                  name: binnacle.Bin_description,
                                  lat: binnacle.Bin_latitude,
                                  lng: binnacle.Bin_lenght
                                });
                              }
                            
                        }
                    }
                }

                console.log(this.locations)
            }
            this.directionsRenderer.setMap(null);

            if(this.locations.length > 0){
                this.drawRoute()
            }
        
    }
    
      drawRoute(): void {
        console.log("entro")
        console.log(this.mainlocation);
        console.log(this.locations);
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();

        this.directionsRenderer.setMap(this.map.googleMap!);
      
        const waypoints: google.maps.DirectionsWaypoint[] = this.locations.map(location => ({
          location: { lat: Number(location.lat), lng: Number(location.lng) },
          stopover: true,
        }));
       
        console.log(waypoints)
       
        
        this.directionsService.route({
          origin: { lat: Number(this.binnacle?.Bin_latitude), lng: Number(this.binnacle?.Bin_lenght) },
          destination: {lat: Number(this.binnacle?.Bin_latitude), lng: Number(this.binnacle?.Bin_lenght) },
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        }, (response: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      
     
      
}
