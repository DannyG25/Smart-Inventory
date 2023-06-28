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
import { Transaction } from 'src/app/demo/api/transaction';
import { Transaction_detail } from 'src/app/demo/api/transaction_detail';
@Component({
    providers: [MessageService],
    templateUrl: './transaction-m.component.html',
    styleUrls: ['./transaction-m.component.scss'],
})
export class TransactionMComponent implements OnInit {
    header_transactions?: Transaction[] = [];
    header_transaction: Transaction={};
    transaction_details: Transaction_detail[] = [];
    transaction_detail: Transaction_detail= {
        Tran_det_mount: 1
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
        

        //   this.eventSourceService.startEventSource('http://localhost:3000/api/antenna/stream');
        //   this.subscription = this.eventSourceService.getServerSentEvent('http://localhost:3000/api/antenna/stream')
        //   .subscribe(
        //     event => console.log(event),
        //     error => console.error(error)
        //   );

        const url = 'http://localhost:3000/api/antenna/stream';
        this.httpsourceservice.startEventSource(url);

        this.subscription = this.httpsourceservice
            .getServerSentEvents<any>('message')
            .subscribe(
                (data: any) => {
                    // this.transaction_detail.Tran_det_mount=0
                    
                    // // Realiza las operaciones necesarias con los datos recibidos en tiempo real
                    // this.transaction_details?.push(this.transaction_detail)
                    // this.transaction_detail={}
                    const existingTransaction = this.transaction_details?.find(
                        (detail) => detail.Product?.ID === data.ID
                      );
                    
                      if (existingTransaction) {
                            existingTransaction.Tran_det_mount += 1;
                            var mount=existingTransaction.Tran_det_mount
                            var price=existingTransaction.Product?.Pro_price
                            var tax=existingTransaction.Product?.Tax?.Tax_rate
                            var subtotal = (price !== undefined) ? price * mount : 0;
                            var taxtotal=(tax !== undefined) ? (subtotal * tax) : 0;
                            var total=subtotal + taxtotal;
                            existingTransaction.Tran_det_subtotal=total
                            this.totalTransaction()

                        } else {
                            this.transaction_detail.Product = data;
                            var price=this.transaction_detail.Product?.Pro_price
                            var tax=this.transaction_detail.Product?.Tax?.Tax_rate
                            var taxtotal=(price !== undefined && tax !== undefined) ? (price * tax) : 0;
                            var subtotal=(price !== undefined) ? price + taxtotal : 0;
                            this.transaction_detail.Tran_det_subtotal=subtotal
                            this.transaction_details.push(this.transaction_detail);
                            this.totalTransaction()
                            
                        }
                        this.transaction_detail={Tran_det_mount: 1}
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

    saveTransaction(){
        if (this.selectedUser?.User_names?.trim() ) {
            this.header_transaction.Users_id=this.userData?.ID
            this.header_transaction.Users2_id=this.selectedUser?.ID
            this.header_transaction.Tran_date=this.date
            this.header_transaction.Tran_Total= this.total
            this.header_transaction.Transaction_details=this.transaction_details
            console.log(this.header_transaction)
            this._api.postTypeRequest('transactions', this.header_transaction).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Saved', life: 3000 });
            }, err => {
                console.log(err)
            });
            this.total=0
            this.header_transactions = [];
            this.header_transaction={};
            this.transaction_details = [];
            this.transaction_detail = {
                Tran_det_mount: 1
            };
        }
        
    }
    totalTransaction(){
        console.log(this.transaction_details)
        const suma= this.transaction_details.reduce((total, detail) => total + (detail.Tran_det_subtotal || 0), 0);
        this.total=parseFloat( suma.toFixed(2))
        
    }
}
