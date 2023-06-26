import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Company_detail } from 'src/app/demo/api/company_detail';
import { User } from 'src/app/demo/api/users';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [MessageService],
  templateUrl: './stock-m.component.html',
  styleUrls: ['./stock-m.component.scss']
})
export class StockMComponent {
  company_detailDialog: boolean = false;
  editCompany_detailDialog: boolean = false;
  id: number = 0
  deleteCompany_detailDialog: boolean = false;

  deleteCompany_detailsDialog: boolean = false;

  company_details: Company_detail[] = [];

  company_detail: Company_detail = {};
  userData?: Company_detail
  selectedCompany_details: Company_detail[] = [];
  selectedStatus: any;
  submitted: boolean = false;

  cols: any[] = [];

  statuses: SelectItem[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private _api: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._api.getTypeRequest('users/validate').subscribe((user: any) => {
      this.userData = user
    }, (err: any) => {
      console.log(err)
    });
    // let idf = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(params => {
      const idf = params.get('id');
      if (idf !== null && idf !== undefined) {
        this.id = Number(idf)
        this._api.getAllByIdTypeRequest('company_details/company_detailsid', this.id).subscribe((data: any) => {
          this.company_details = data
        }, err => {
          console.log(err)
        });
      }


    });
    // this.id = parseInt( `${idf}`)
    // console.log(this.id)


    this.cols = [
      { field: 'company_detail', header: 'Company_detail' }
    ];



  }

  openNew() {

    // this.statuses=  [];
    // this.company_detailDialog = true;
    // this.company_details.forEach(comp => {
    //   const statusElement = {
    //     label: comp.Mov_name,
    //     value: comp.ID
    //   };
    //   this.statuses.push(statusElement);
    // });

    this.company_detail = {};
    this.submitted = false;
    this.company_detailDialog = true;
  }



  deleteSelectedCompany_details() {
    this.deleteCompany_detailsDialog = true;
  }

  editCompany_detail(company_detail: Company_detail) {
    this.company_detail = { ...company_detail };
    this.editCompany_detailDialog = true;
  }

  deleteCompany_detail(company_detail: Company_detail) {
    this.deleteCompany_detailDialog = true;
    this.company_detail = { ...company_detail };
  }

  confirmDeleteSelected() {
    this.deleteCompany_detailsDialog = false;
    console.log(this.selectedCompany_details)
    for (let selectCompany_detail of this.selectedCompany_details) {
      this._api.deleteTypeRequest('company_details', selectCompany_detail.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('company_details').subscribe((data: any) => this.company_details = data);
    this.company_details = this.company_details.filter(val => !this.selectedCompany_details.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company_details Deleted', life: 3000 });

    this.selectedCompany_details = [];

  }

  confirmDelete() {
    this.deleteCompany_detailDialog = false;
    this._api.deleteTypeRequest('company_details', this.company_detail.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company_detail Deleted', life: 3000 });
      this.company_detail = {};
      this._api.getAllByIdTypeRequest('company_details/company_detailsid', this.id).subscribe((data: any) => this.company_details = data);
    }, err => {
      console.log(err)
    });

  }

  hideDialog() {
    this.company_detailDialog = false;
    this.submitted = false;
    this.editCompany_detailDialog = false;
  }

  saveCompany_detail() {
    this.submitted = true;
    if (this.company_detail.Comp_det_stock?.trim()) {
      console.log(this.company_detail)
      // this.company_detail.Device_id = this.id
      console.log(this.company_detail)
      this._api.postTypeRequest('company_details', this.company_detail).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company_detail Created', life: 3000 });
        this._api.getAllByIdTypeRequest('company_details/company_detailsid', this.id).subscribe((data: any) => this.company_details = data);
      }, err => {
        console.log(err)
      });
      this.company_detailDialog = false;
      this.company_detail = {};
    }
  }
  saveEditCompany_detail() {
    this.submitted = true;
    if (this.company_detail.Comp_det_stock?.trim()) {
      // this.company_detail.Device_id = this.id
      this._api.putTypeRequest('company_details', this.company_detail).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company_detail Updated', life: 3000 });

        console.log()
        this._api.getAllByIdTypeRequest('company_details/company_detailsid', this.id).subscribe((data: any) => this.company_details = data);
      }, err => {
        console.log(err)
      });
      this.editCompany_detailDialog = false;
      this.company_detail = {};
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}