import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Inventory_header } from 'src/app/demo/api/inventory_header';
import { Binnacle } from 'src/app/demo/api/binnacle';
import { Router } from '@angular/router';
import { User } from 'src/app/demo/api/users';

@Component({
  providers: [MessageService],
  templateUrl: './inventorylist-m.component.html',
  styleUrls: ['./inventorylist-m.component.scss']
})
export class InventorylistMComponent {
  inventoryDialog: boolean = false;
  editInventoryDialog: boolean = false;

  deleteInventoryDialog: boolean = false;

  deleteInventoriesDialog: boolean = false;

  inventories: Inventory_header[] = [];
  binnacle: Binnacle={};
  inventory: Inventory_header = {
    Inventory_details: []
  };
  userData?: User
  selectedInventories: Inventory_header[] = [];
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
      this._api.getTypeRequest('inventories').subscribe((data: any) => {
        this.inventories = data
      }, err => {
        console.log(err)
      });
    }, (err: any) => {
      console.log(err)
    });
    
    
    this.cols = [
      { field: 'inventory', header: 'Inventory' }
    ];


  }

  openNew() {

    // this.statuses=  [];
    // this.inventoryDialog = true;
    // this.inventories.forEach(comp => {
    //   const statusElement = {
    //     label: comp.Inventory_name,
    //     value: comp.ID
    //   };
    //   this.statuses.push(statusElement);
    // });

    this.inventory = {
      Inventory_details:[]
    };
    this.submitted = false;
    this.inventoryDialog = true;
  }



  deleteSelectedInventories() {
    this.deleteInventoriesDialog = true;
  }

  editInventory(inventory: Inventory_header) {
    this.inventory = { ...inventory };
    this.editInventoryDialog = true;
  }

  deleteInventory(inventory: Inventory_header) {
    this.deleteInventoryDialog = true;
    this.inventory = { ...inventory };
  }
  viewBinnacles(inventory: Inventory_header){
    this.router.navigate(['/management/binnacle'], { queryParams: { id: inventory.ID } });
  }

  confirmDeleteSelected() {
    this.deleteInventoriesDialog = false;
    console.log(this.selectedInventories)
    for (let selectInventory of this.selectedInventories) {
      this._api.deleteTypeRequest('inventories', selectInventory.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('inventories').subscribe((data: any) => this.inventories = data);
    this.inventories = this.inventories.filter(val => !this.selectedInventories.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Inventories Deleted', life: 3000 });

    this.selectedInventories = [];

  }

  confirmDelete() {
    this.deleteInventoryDialog = false;
    this._api.deleteTypeRequest('inventories', this.inventory.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Inventory Deleted', life: 3000 });
      this.inventory = {
        Inventory_details:[]

      };
      this._api.getTypeRequest('inventories').subscribe((data: any) => this.inventories = data);
    }, err => {
      console.log(err)
    }
    );

  }

  hideDialog() {
    this.inventoryDialog = false;
    this.submitted = false;
    this.editInventoryDialog=false;
  }

  saveInventory() {
    this.submitted = true;
    if (this.inventory.Inv_head_date) {
      
      // this.inventory.Company_id=this.userData?.Company_id
      // this.inventory.Binnacles?.push(this.binnacle)
      console.table(this.inventory)
      
      this._api.postTypeRequest('inventories', this.inventory).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Inventory Created', life: 3000 });
        this._api.getTypeRequest('inventories').subscribe((data: any) => this.inventories = data);      }, err => {
        console.log(err)
      });
      this.inventoryDialog = false;
      this.inventory = {
        Inventory_details:[]
      };
      this.binnacle={}
    }
  }
  saveEditInventory() {
    this.submitted = true;
    if (this.inventory.Inv_head_date) {
      // console.log(this.inventory.Inventory_names)
      // this.inventory.Company_id=this.userData?.Company_id
      this._api.putTypeRequest('inventories', this.inventory).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Inventory Updated', life: 3000 });

        console.log()
        this._api.getTypeRequest('inventories').subscribe((data: any) => this.inventories = data);      }, err => {
        console.log(err)
      });
      this.editInventoryDialog = false;
      this.inventory = {
        Inventory_details:[]
      };
      this.binnacle={}
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}

