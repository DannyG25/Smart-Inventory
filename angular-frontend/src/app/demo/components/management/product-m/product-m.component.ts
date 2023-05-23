import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { Binnacle } from 'src/app/demo/api/binnacle';
import { Router } from '@angular/router';
import { User } from 'src/app/demo/api/users';
import { Unit_measure } from 'src/app/demo/api/unit_measure';
import { Tax } from 'src/app/demo/api/tax';
import { Category } from 'src/app/demo/api/category';

@Component({
  providers: [MessageService],
  templateUrl: './product-m.component.html',
  styleUrls: ['./product-m.component.scss']
})
export class ProductMComponent {
  productDialog: boolean = false;
  editProductDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];
  categorys: Category[] = [];
  taxs: Tax[] = [];
  unitmeasures: Unit_measure[] = [];
  
  product: Product = {};
  userData?: User
  selectedProducts: Product[] = [];
  selectedStatus: any;
  submitted: boolean = false;

  cols: any[] = [];

  selectedCategory: any
  selectedTax: any
  selectedUnitmeasure: any
  selectedProduct: any

  categorysItems: SelectItem[] = [];
  taxsItems: SelectItem[] = [];
  unitmeasureItems: SelectItem[] = [];
  productsItems: SelectItem[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private _api: ApiService,
    private messageService: MessageService,
    private router: Router

  ) { }

  ngOnInit() {
    this._api.getTypeRequest('users/validate').subscribe((user: any) => {
      this.userData = user
      // this._api.getAllByIdTypeRequest('products/productsid',this.userData?.Company_id ?? 0).subscribe((data: any) => {
      //   this.products = data
      // }, err => {
      //   console.log(err)
      // });
    }, (err: any) => {
      console.log(err)
    });

    this._api.getTypeRequest('products').subscribe((data: any) => {
      this.products = data
    }, err => {
      console.log(err)
    });
    this._api.getTypeRequest('categories').subscribe((data: any) => {
      this.categorys = data
    }, err => {
      console.log(err)
    });
    this._api.getTypeRequest('taxs').subscribe((data: any) => {
      this.taxs = data
    }, err => {
      console.log(err)
    });
    this._api.getTypeRequest('unit_measures').subscribe((data: any) => {
      this.unitmeasures = data
    }, err => {
      console.log(err)
    });
    
    
    this.cols = [
      { field: 'product', header: 'Product' }
    ];


  }

  openNew() {

    this.loadItems()
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }



  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: Product) {
    this.loadItems();
    this.product = { ...product };
    
    this.editProductDialog = true;
  }

  deleteProduct(product: Product) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }
 

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    console.log(this.selectedProducts)
    for (let selectProduct of this.selectedProducts) {
      this._api.deleteTypeRequest('products', selectProduct.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('products').subscribe((data: any) => this.products = data);
    this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });

    this.selectedProducts = [];

  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this._api.deleteTypeRequest('products', this.product.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      this.product = {};
      this._api.getTypeRequest('products').subscribe((data: any) => this.products = data);
    }, err => {
      console.log(err)
    }
    );

  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.editProductDialog=false;
  }

  saveProduct() {
    this.submitted = true;
    if (this.product.Pro_name?.trim()) {
      
      // this.product.Company_id=this.userData?.Company_id
      // this.product.Binnacles?.push(this.binnacle)
      console.table(this.product)
      console.log(this.selectedCategory)
      this.product.Category_id=this.selectedCategory
      this.product.Tax_id=this.selectedTax
      this.product.UnitMeasure_id=this.selectedUnitmeasure
      this.product.ProductID=this.selectedProduct
      
      this._api.postTypeRequest('products', this.product).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        this._api.getTypeRequest('products').subscribe((data: any) => this.products = data);      }, err => {
        console.log(err)
      });
      this.productDialog = false;
      this.product = {};
      
    }
  }
  saveEditProduct() {
    this.submitted = true;
    if (this.product.Pro_name?.trim()) {
      this.product.Category_id=this.selectedCategory
      this.product.Tax_id=this.selectedTax
      this.product.UnitMeasure_id=this.selectedUnitmeasure
      this.product.ProductID=this.selectedProduct
      this._api.putTypeRequest('products', this.product).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

        console.log()
        this._api.getTypeRequest('products').subscribe((data: any) => this.products = data);      }, err => {
          console.log(err)
      });
      this.editProductDialog = false;
      this.product = {};
      
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  loadItems(){
    this.productsItems=  [];
    this.categorysItems=[]
    this.taxsItems=[]
    this.unitmeasureItems=[]
    // this.selectedCategory: 
    // this.selectedTax
    // this.selectedUnitmeasure
    // this.selectedProduct
    
    this.products.forEach(pro => {
      const producElement = {
        label: pro.Pro_name,
        value: pro.ID
      };
      this.productsItems.push(producElement);
    });

    this.categorys.forEach(cat => {
      const categoryElement = {
        label: cat.Cat_name,
        value: cat.ID
      };
      this.categorysItems.push(categoryElement);
    });

    this.taxs.forEach(tax => {
      const taxElement = {
        label: tax.Tax_name,
        value: tax.ID
      };
      this.taxsItems.push(taxElement);
    });

    this.unitmeasures.forEach(uni => {
      const unitmeasureElement = {
        label: uni.Uni_abbreviation,
        value: uni.ID
      };
      this.unitmeasureItems.push(unitmeasureElement);
    });

  }

}
