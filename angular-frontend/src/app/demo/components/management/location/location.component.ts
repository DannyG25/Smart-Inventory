import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Company } from 'src/app/demo/api/company';
import { ApiService } from 'src/app/demo/service/api.service';
import * as L from 'leaflet';
import { Map, NavigationControl, Marker, Popup } from 'maplibre-gl';
import { Device } from 'src/app/demo/api/device';
import { Binnacle } from 'src/app/demo/api/binnacle';
import { User } from 'src/app/demo/api/users';

@Component({
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {
  map: Map | undefined;
  companies?: Company[] = [];
  company?: Company = {};
  UserData?: User
  devices?: Device[] = [];
  binnacles?: Binnacle[] = []
  binnacle?: Binnacle = {}
  cols: any[] = [];
  navigationControl = new NavigationControl({});



  CompanyData?: Company

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {

    this.loadCompany();
    console.log(this.companies)

  }

  loadCompany() {
    this._api.getTypeRequest('users/validate').subscribe((user: any) => {
      this.UserData = user
      

      this._api.getByIdTypeRequest('companies', this.UserData?.Company_id ?? 0).subscribe((company: any) => {
        this.CompanyData = company
        console.log(this.CompanyData)
        this.companies = this.CompanyData?.Children_comp
        this.cols = [
          { field: 'company', header: 'Company' }
        ];
        // this.loadLocations();
        this.loadMap()
      }, (err: any) => {
        console.log(err)

      });
    }, (err: any) => {
      console.log(err)

    });


  }

  loadLocations() {
    
    // get locations of company's children
    if (this.companies) {
      for (let company of this.companies) {
        for (let device of company.Devices ?? []) {
          for (let binnacle of device.Binnacles ?? []) {

            this.binnacles?.push(binnacle)
          }
        }
      }
    }
    this.loadMap();
  }

  loadMap() {

    // Create map
    const initialState = { lng: -79.0045, lat: -2.9005, zoom: 14 };
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=OpfKn1gJGdcklgZ3Fa3E',
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
    // create controls of map
    this.map.addControl(this.navigationControl = new NavigationControl({
      showCompass: true,
      showZoom: true,
    }));

    // get locatio of company
    for (let device of this.CompanyData?.Devices ?? []) {
      for (let binnacle of device.Binnacles ?? []) {
        this.binnacle = binnacle
        console.log(this.binnacle)
        const marker = new Marker({ color: 'red' })
      .setLngLat([this.binnacle?.Bin_lenght ?? 0, this.binnacle?.Bin_latitude ?? 0])
      .addTo(this.map);
    const popup = new Popup({ offset: 25 })
      .setHTML(`<p>${this.binnacle?.Bin_description}</p>`);

    marker.setPopup(popup);
    this.binnacle = {}
      }
    }
    // create marker of company
    


    // create markers of company's children
    if (this.companies) {
      for (let company of this.companies) {
        const colorMarker = this.getRandomColor();
        for (let device of company.Devices ?? []) {
          for (let binnacle of device.Binnacles ?? []) {
            this.binnacles?.push(binnacle)
            const marker = new Marker({ color: colorMarker })
          .setLngLat([binnacle.Bin_lenght ?? 0, binnacle.Bin_latitude ?? 0])
          .addTo(this.map);

        const popup = new Popup({ offset: 25 })
          .setHTML(`<p>${binnacle.Bin_description}</p>`);

        marker.setPopup(popup);
          }
        }
      }
    }
    // if (this.binnacles) {
    //   const color = this.getRandomColor();
    //   for (let entidad of this.binnacles) {
    //     const marker = new Marker({ color: 'blue' })
    //       .setLngLat([entidad.Bin_lenght ?? 0, entidad.Bin_latitude ?? 0])
    //       .addTo(this.map);

    //     const popup = new Popup({ offset: 25 })
    //       .setHTML(`<p>${entidad.Bin_description}</p>`);

    //     marker.setPopup(popup);
    //   }
    // }


  }

  ngOnDestroy() {
    this.map?.remove();
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
