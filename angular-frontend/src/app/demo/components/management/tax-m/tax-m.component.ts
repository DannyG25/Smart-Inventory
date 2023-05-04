import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Tax } from 'src/app/demo/api/tax';


@Component({
  providers: [MessageService],
  templateUrl: './tax-m.component.html',
  styleUrls: ['./tax-m.component.scss']
})
export class TaxMComponent {
  taxDialog: boolean = false;
  editTaxDialog: boolean = false;

  deleteTaxDialog: boolean = false;

  deleteTaxsDialog: boolean = false;

  taxs: Tax[] = [];

  tax: Tax = {};
  userData?: Tax
  selectedTaxs: Tax[] = [];
  selectedStatus: any;
  submitted: boolean = false;

  cols: any[] = [];

  statuses: SelectItem[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private _api: ApiService,
    private messageService: MessageService,

  ) { }

  ngOnInit() {
    this._api.getTypeRequest('users/validate').subscribe((user: any) => {
      this.userData = user
    }, (err: any) => {
      console.log(err)
    });
    this._api.getTypeRequest('taxs').subscribe((data: any) => {
      this.taxs = data
    }, err => {
      console.log(err)
    });
    this.cols = [
      { field: 'tax', header: 'Tax' }
    ];


  }

  openNew() {

    // this.statuses=  [];
    // this.taxDialog = true;
    // this.taxs.forEach(comp => {
    //   const statusElement = {
    //     label: comp.Tax_name,
    //     value: comp.ID
    //   };
    //   this.statuses.push(statusElement);
    // });

    this.tax = {};
    this.submitted = false;
    this.taxDialog = true;
  }



  deleteSelectedTaxs() {
    this.deleteTaxsDialog = true;
  }

  editTax(tax: Tax) {
    this.tax = { ...tax };
    this.editTaxDialog = true;
  }

  deleteTax(tax: Tax) {
    this.deleteTaxDialog = true;
    this.tax = { ...tax };
  }

  confirmDeleteSelected() {
    this.deleteTaxsDialog = false;
    console.log(this.selectedTaxs)
    for (let selectTax of this.selectedTaxs) {
      this._api.deleteTypeRequest('taxs', selectTax.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('taxs').subscribe((data: any) => this.taxs = data);
    this.taxs = this.taxs.filter(val => !this.selectedTaxs.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Taxs Deleted', life: 3000 });

    this.selectedTaxs = [];

  }

  confirmDelete() {
    this.deleteTaxDialog = false;
    this._api.deleteTypeRequest('taxs', this.tax.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tax Deleted', life: 3000 });
      this.tax = {};
      this._api.getTypeRequest('taxs').subscribe((data: any) => this.taxs = data);
    }, err => {
      console.log(err)
    });

  }

  hideDialog() {
    this.taxDialog = false;
    this.submitted = false;
    this.editTaxDialog=false;
  }

  saveTax() {
    this.submitted = true;
    if (this.tax.Tax_name?.trim()) {
      console.log(this.tax)
      // this.tax.Company_id=this.TaxData?.Company_id
      this._api.postTypeRequest('taxs', this.tax).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tax Created', life: 3000 });
        this._api.getTypeRequest('taxs').subscribe((data: any) => this.taxs = data);
      }, err => {
        console.log(err)
      });
      this.taxDialog = false;
      this.tax = {};
    }
  }
  saveEditTax() {
    this.submitted = true;
    if (this.tax.Tax_name?.trim()) {
      console.log(this.tax.Tax_name)
      // this.tax.Company_id=this.TaxData?.Company_id
      this._api.putTypeRequest('taxs', this.tax).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tax Updated', life: 3000 });

        console.log()
        this._api.getTypeRequest('taxs').subscribe((data: any) => this.taxs = data);
      }, err => {
        console.log(err)
      });
      this.editTaxDialog = false;
      this.tax = {};
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
