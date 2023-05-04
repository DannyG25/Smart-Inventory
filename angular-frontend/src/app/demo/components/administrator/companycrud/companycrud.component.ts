import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Company } from 'src/app/demo/api/company';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';

@Component({
  templateUrl: './companycrud.component.html',
  providers: [MessageService]
})
export class CompanycrudComponent {
  companyDialog: boolean = false;
  editCompanyDialog: boolean = false;

  deleteCompanyDialog: boolean = false;

  deleteCompaniesDialog: boolean = false;

  companies: Company[] = [];

  company: Company = {};

  selectedCompanies: Company[] = [];
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
    this._api.getTypeRequest('companies').subscribe((data: any) => {
      this.companies = data


    }, err => {
      console.log(err)
    });
    this.cols = [
      { field: 'company', header: 'Company' }
    ];


  }

  openNew() {

    // this.statuses=  [];
    // this.companyDialog = true;
    // this.companies.forEach(comp => {
    //   const statusElement = {
    //     label: comp.Comp_name,
    //     value: comp.ID
    //   };
    //   this.statuses.push(statusElement);
    // });

    this.company = {};
    this.submitted = false;
    this.companyDialog = true;
  }



  deleteSelectedCompanies() {
    this.deleteCompaniesDialog = true;
  }

  editCompany(company: Company) {
    this.company = { ...company };
    this.editCompanyDialog = true;
  }

  deleteCompany(company: Company) {
    this.deleteCompanyDialog = true;
    this.company = { ...company };
  }

  confirmDeleteSelected() {
    this.deleteCompaniesDialog = false;
    console.log(this.selectedCompanies)
    for (let selectCompany of this.selectedCompanies) {
      this._api.deleteTypeRequest('companies', selectCompany.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('companies').subscribe((data: any) => this.companies = data);
    this.companies = this.companies.filter(val => !this.selectedCompanies.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Companies Deleted', life: 3000 });

    this.selectedCompanies = [];

  }

  confirmDelete() {
    this.deleteCompanyDialog = false;
    this._api.deleteTypeRequest('companies', this.company.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Deleted', life: 3000 });
      this.company = {};
      this._api.getTypeRequest('companies').subscribe((data: any) => this.companies = data);
    }, err => {
      console.log(err)
    });

  }

  hideDialog() {
    this.companyDialog = false;
    this.submitted = false;
  }

  saveCompany() {
    this.submitted = true;
    if (this.company.Comp_name?.trim()) {
      console.log(this.company)
      this._api.postTypeRequest('companies', this.company).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Created', life: 3000 });
        this._api.getTypeRequest('companies').subscribe((data: any) => this.companies = data);
      }, err => {
        console.log(err)
      });
      this.companyDialog = false;
      this.company = {};
    }
  }
  saveEditCompany() {
    this.submitted = true;
    if (this.company.Comp_name?.trim()) {
      console.log(this.company.Comp_name)
      this._api.putTypeRequest('companies', this.company).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company Updated', life: 3000 });

        console.log()
        this._api.getTypeRequest('companies').subscribe((data: any) => this.companies = data);
      }, err => {
        console.log(err)
      });
      this.editCompanyDialog = false;
      this.company = {};
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
