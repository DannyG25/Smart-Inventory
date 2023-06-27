import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Transaction } from 'src/app/demo/api/transaction';
import { Binnacle } from 'src/app/demo/api/binnacle';
import { Router } from '@angular/router';
import { User } from 'src/app/demo/api/users';

@Component({
  providers: [MessageService],
  templateUrl: './transactionslist-m.component.html',
  styleUrls: ['./transactionslist-m.component.scss']
})
export class TransactionslistMComponent {
  transactionDialog: boolean = false;
  editTransactionDialog: boolean = false;

  deleteTransactionDialog: boolean = false;

  deleteTransactionsDialog: boolean = false;

  transactions: Transaction[] = [];
  binnacle: Binnacle={};
  transaction: Transaction = {
    Transaction_details: []
  };
  userData?: User
  selectedTransactions: Transaction[] = [];
  selectedStatus: any;
  submitted: boolean = false;

  cols: any[] = [];

  statuses: SelectItem[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private _api: ApiService,
    private messageService: MessageService,
    private router: Router

  ) { }

  ngOnInit() {
    this._api.getTypeRequest('users/validate').subscribe((user: any) => {
      this.userData = user
      this._api.getTypeRequest('transactions').subscribe((data: any) => {
        this.transactions = data
      }, err => {
        console.log(err)
      });
    }, (err: any) => {
      console.log(err)
    });
    
    
    this.cols = [
      { field: 'transaction', header: 'Transaction' }
    ];


  }

  openNew() {

    // this.statuses=  [];
    // this.transactionDialog = true;
    // this.transactions.forEach(comp => {
    //   const statusElement = {
    //     label: comp.Transaction_name,
    //     value: comp.ID
    //   };
    //   this.statuses.push(statusElement);
    // });

    this.transaction = {
      Transaction_details:[]
    };
    this.submitted = false;
    this.transactionDialog = true;
  }



  deleteSelectedTransactions() {
    this.deleteTransactionsDialog = true;
  }

  editTransaction(transaction: Transaction) {
    this.transaction = { ...transaction };
    this.editTransactionDialog = true;
  }

  deleteTransaction(transaction: Transaction) {
    this.deleteTransactionDialog = true;
    this.transaction = { ...transaction };
  }
  viewBinnacles(transaction: Transaction){
    this.router.navigate(['/management/binnacle'], { queryParams: { id: transaction.ID } });
  }

  confirmDeleteSelected() {
    this.deleteTransactionsDialog = false;
    console.log(this.selectedTransactions)
    for (let selectTransaction of this.selectedTransactions) {
      this._api.deleteTypeRequest('transactions', selectTransaction.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('transactions').subscribe((data: any) => this.transactions = data);
    this.transactions = this.transactions.filter(val => !this.selectedTransactions.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transactions Deleted', life: 3000 });

    this.selectedTransactions = [];

  }

  confirmDelete() {
    this.deleteTransactionDialog = false;
    this._api.deleteTypeRequest('transactions', this.transaction.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Deleted', life: 3000 });
      this.transaction = {
        Transaction_details:[]

      };
      this._api.getTypeRequest('transactions').subscribe((data: any) => this.transactions = data);
    }, err => {
      console.log(err)
    }
    );

  }

  hideDialog() {
    this.transactionDialog = false;
    this.submitted = false;
    this.editTransactionDialog=false;
  }

  saveTransaction() {
    this.submitted = true;
    if (this.transaction.Tran_Total) {
      
      // this.transaction.Company_id=this.userData?.Company_id
      // this.transaction.Binnacles?.push(this.binnacle)
      console.table(this.transaction)
      
      this._api.postTypeRequest('transactions', this.transaction).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Created', life: 3000 });
        this._api.getTypeRequest('transactions').subscribe((data: any) => this.transactions = data);      }, err => {
        console.log(err)
      });
      this.transactionDialog = false;
      this.transaction = {
        Transaction_details:[]
      };
      this.binnacle={}
    }
  }
  saveEditTransaction() {
    this.submitted = true;
    if (this.transaction.Tran_Total) {
      // console.log(this.transaction.Transaction_names)
      // this.transaction.Company_id=this.userData?.Company_id
      this._api.putTypeRequest('transactions', this.transaction).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Transaction Updated', life: 3000 });

        console.log()
        this._api.getTypeRequest('transactions').subscribe((data: any) => this.transactions = data);      }, err => {
        console.log(err)
      });
      this.editTransactionDialog = false;
      this.transaction = {
        Transaction_details:[]
      };
      this.binnacle={}
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
