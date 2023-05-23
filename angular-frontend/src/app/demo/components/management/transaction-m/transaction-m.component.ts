import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Company } from 'src/app/demo/api/company';
import { ApiService } from 'src/app/demo/service/api.service';
import * as L from 'leaflet';
import { Map, NavigationControl, Marker, Popup } from 'maplibre-gl';
import { Device } from 'src/app/demo/api/device';
import { Binnacle } from 'src/app/demo/api/binnacle';
import { User } from 'src/app/demo/api/users';
import { MessageService } from 'primeng/api';
import { Tax } from 'src/app/demo/api/tax';

@Component({
  providers: [MessageService],
  templateUrl: './transaction-m.component.html',
  styleUrls: ['./transaction-m.component.scss']
})
export class TransactionMComponent implements OnInit {
  // map:maplibregl.Map | undefined;
  companies?: Company[] = [];
  company?: Company = {};
  UserData?: User
  devices?: Device[] = [];
  binnacles?: Binnacle[] = []
  binnacle?: Binnacle = {}
  markers: Marker[] = [];
  cols: any[] = [];
  navigationControl = new NavigationControl({});
  selectedCompanies: Company[] = [];
  filteredCountries: any[] = [];
  countries: any[]=[];
  date?:Date
  selectedCountry: string | undefined;
  CompanyData?: Company
  taxs?: Tax[]
  selectedTax?: Tax
  users: User[] = [];
  selectedUser?: User
  @ViewChild('map',{static:false})
  private mapContainer!: ElementRef<HTMLElement>;

  map!: Map;
  constructor(
    private _api: ApiService,
    
  ) { }

  ngOnInit(): void {

    this._api.getTypeRequest('taxs').subscribe((data: any) => {
      this.taxs = data
    }, err => {
      console.log(err)
    });
    this._api.getTypeRequest('users').subscribe((data: any) => {
      this.users = data
    }, err => {
      console.log(err)
    });
    this.date=new Date();
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
      { name: 'United States', code: 'US' }
  ];

  }
  

  
  
  

 

  

  
  
 

  searchCountry(event: any) {
    // in a real application, make a request to a remote url with the query and
    // return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    const query = event.query;
    // tslint:disable-next-line:prefer-for-of
    // for (let i = 0; i < this.countries.length; i++) {
    //     const country = this.countries[i];
    //     if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //         filtered.push(country);
    //     }
    // }

    // this.filteredCountries = filtered;
}
}

