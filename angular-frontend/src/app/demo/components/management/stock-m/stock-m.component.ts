import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Company_detail } from 'src/app/demo/api/company_detail';
import { User } from 'src/app/demo/api/users';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/demo/api/product';

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
  products: Product[] = [];
  selectedProduct: any
  product: Product = {};
  company_detail: Company_detail = {};
  userData?: Company_detail
  selectedCompany_details: Company_detail[] = [];
  selectedStatus: any;
  submitted: boolean = false;
  productsItems: SelectItem[] = [];

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
      this.id=this.userData?.Company_id ?? 0
      this._api.getAllByIdTypeRequest('company_details/company_detailsid', this.id).subscribe((data: any) => {
          this.company_details = data
        }, err => {
          console.log(err)
        });
    }, (err: any) => {
      console.log(err)
    });
    // let idf = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(params => {
      const idf = params.get('id');
      if (idf !== null && idf !== undefined) {
        this.id = Number(idf)
        
      }


    });
    // this.id = parseInt( `${idf}`)
    // console.log(this.id)


    this.cols = [
      { field: 'company_detail', header: 'Company_detail' }
    ];
    this._api.getTypeRequest('products').subscribe((data: any) => {
      this.products = data
    }, err => {
      console.log(err)
    });



  }

  openNew() {
    this.selectedProduct=0
    this.loadItems();
    this.company_detail = {};
    this.submitted = false;
    this.company_detailDialog = true;
  }



  deleteSelectedCompany_details() {
    this.deleteCompany_detailsDialog = true;
  }

  editCompany_detail(company_detail: Company_detail) {
    this.loadItems();
    this.company_detail = { ...company_detail };
    this.editCompany_detailDialog = true;
    this.selectedProduct=this.company_detail.Product_id
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
    this.selectedProduct=0
  }

  saveCompany_detail() {
    this.submitted = true;
    if (this.selectedProduct) {
      this.company_detail.Company_id=this.userData?.Company_id
      this.company_detail.Product_id = this.selectedProduct
      console.log(this.company_detail)
      this._api.postTypeRequest('company_details', this.company_detail).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company_detail Created', life: 3000 });
        this._api.getAllByIdTypeRequest('company_details/company_detailsid', this.id).subscribe((data: any) => this.company_details = data);
      }, err => {
        console.log(err)
      });
      this.company_detailDialog = false;
      this.company_detail = {};
      this.selectedProduct=0
      
    }
  }
  saveEditCompany_detail() {
    this.submitted = true;
    if (this.selectedProduct ) {
      this.company_detail.Company_id=this.userData?.Company_id
      this.company_detail.Product_id = this.selectedProduct
      console.log(this.company_detail)
      this._api.putTypeRequest('company_details', this.company_detail).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Company_detail Updated', life: 3000 });

        console.log()
        this._api.getAllByIdTypeRequest('company_details/company_detailsid', this.id).subscribe((data: any) => this.company_details = data);
      }, err => {
        console.log(err)
      });
      this.editCompany_detailDialog = false;
      this.company_detail = {};
      this.selectedProduct=0
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  loadItems(){
    this.productsItems=  [];


    
    this.products.forEach(pro => {
      const producElement = {
        label: pro.Pro_name,
        value: pro.ID
      };
      this.productsItems.push(producElement);
    });

    
  }
}