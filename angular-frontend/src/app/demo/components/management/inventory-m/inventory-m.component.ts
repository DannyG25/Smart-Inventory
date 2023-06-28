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
import { Inventory_header } from 'src/app/demo/api/inventory_header';
import { Inventory_detail } from 'src/app/demo/api/inventory_detail';


@Component({
  providers: [MessageService],
  templateUrl: './inventory-m.component.html',
  styleUrls: ['./inventory-m.component.scss']
})
export class InventoryMComponent {
  inventory_headers?: Inventory_header[] = [];
  inventory_header: Inventory_header={};
  inventory_details: Inventory_detail[] = [];
  inventory_detail: Inventory_detail= {
      Inv_det_count:1
  };

  companies?: Company[] = [];
    company?: Company = {};
    userData?: User;
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
    total:number=0

    constructor(
        private _api: ApiService,
        private eventSourceService: EventsourceService,
        private httpsourceservice: HttpsourceService,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        this._api.getTypeRequest('users/validate').subscribe((user: any) => {
            this.userData = user
            
          }, (err: any) => {
            console.log(err)
          });
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
        
    }

    startStream(){
      const url = 'http://localhost:3000/api/antenna/stream';
        this.httpsourceservice.startEventSource(url);

        this.subscription = this.httpsourceservice
            .getServerSentEvents<any>('message')
            .subscribe(
                (data: any) => {
                    
                    const existingInventory_header = this.inventory_details?.find(
                        (detail) => detail.Product?.ID === data.ID
                      );
                    
                      if (existingInventory_header) {
                            existingInventory_header.Inv_det_count += 1;
                            

                        } else {
                            this.inventory_detail.Product = data;
                            this.inventory_details.push(this.inventory_detail);
                            
                        }
                        this.inventory_detail={Inv_det_count: 1}
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
    stopStream() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.httpsourceservice.closeEventSource();
        }
    }

    saveInventory_header(){
        
            this.inventory_header.Users_id=this.userData?.ID
            this.inventory_header.Inv_head_date=this.date
            this.inventory_header.Company_id= this.userData?.Company_id
            this.inventory_header.Inventory_details=this.inventory_details
            console.log(this.inventory_header)
            this._api.postTypeRequest('inventories', this.inventory_header).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Inventory_header Saved', life: 3000 });
            }, err => {
                console.log(err)
            });
            this.total=0
            this.inventory_headers = [];
            this.inventory_header={};
            this.inventory_details = [];
            this.inventory_detail= {
                Inv_det_count:1
            };
        
        
    }
    
}


