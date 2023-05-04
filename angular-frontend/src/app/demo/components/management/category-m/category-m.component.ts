import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Category } from 'src/app/demo/api/category';

@Component({
  providers: [MessageService],
  templateUrl: './category-m.component.html',
  styleUrls: ['./category-m.component.scss']
})
export class CategoryMComponent {
  categoryDialog: boolean = false;
  editCategoryDialog: boolean = false;

  deleteCategoryDialog: boolean = false;

  deleteCategorysDialog: boolean = false;

  categorys: Category[] = [];

  category: Category = {};
  userData?: Category
  selectedCategorys: Category[] = [];
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
    this._api.getTypeRequest('categories').subscribe((data: any) => {
      this.categorys = data
    }, err => {
      console.log(err)
    });
    this.cols = [
      { field: 'category', header: 'Category' }
    ];


  }

  openNew() {

    // this.statuses=  [];
    // this.categoryDialog = true;
    // this.categorys.forEach(comp => {
    //   const statusElement = {
    //     label: comp.Category_name,
    //     value: comp.ID
    //   };
    //   this.statuses.push(statusElement);
    // });

    this.category = {};
    this.submitted = false;
    this.categoryDialog = true;
  }



  deleteSelectedCategorys() {
    this.deleteCategorysDialog = true;
  }

  editCategory(category: Category) {
    this.category = { ...category };
    this.editCategoryDialog = true;
  }

  deleteCategory(category: Category) {
    this.deleteCategoryDialog = true;
    this.category = { ...category };
  }

  confirmDeleteSelected() {
    this.deleteCategorysDialog = false;
    console.log(this.selectedCategorys)
    for (let selectCategory of this.selectedCategorys) {
      this._api.deleteTypeRequest('categories', selectCategory.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('categorys').subscribe((data: any) => this.categorys = data);
    this.categorys = this.categorys.filter(val => !this.selectedCategorys.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Categorys Deleted', life: 3000 });

    this.selectedCategorys = [];

  }

  confirmDelete() {
    this.deleteCategoryDialog = false;
    this._api.deleteTypeRequest('categories', this.category.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
      this.category = {};
      this._api.getTypeRequest('categories').subscribe((data: any) => this.categorys = data);
    }, err => {
      console.log(err)
    });

  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
    this.editCategoryDialog=false;
  }

  saveCategory() {
    this.submitted = true;
    if (this.category.Cat_name?.trim()) {
      console.log(this.category)
      // this.category.Company_id=this.CategoryData?.Company_id
      this._api.postTypeRequest('categories', this.category).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
        this._api.getTypeRequest('categories').subscribe((data: any) => this.categorys = data);
      }, err => {
        console.log(err)
      });
      this.categoryDialog = false;
      this.category = {};
    }
  }
  saveEditCategory() {
    this.submitted = true;
    if (this.category.Cat_name?.trim()) {
      // console.log(this.category.Category_name)
      // this.category.Company_id=this.CategoryData?.Company_id
      this._api.putTypeRequest('categories', this.category).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });

        console.log()
        this._api.getTypeRequest('categories').subscribe((data: any) => this.categorys = data);
      }, err => {
        console.log(err)
      });
      this.editCategoryDialog = false;
      this.category = {};
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
