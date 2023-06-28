import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Inventory_header } from 'src/app/demo/api/inventory_header';
import { Binnacle } from 'src/app/demo/api/binnacle';
import { Router } from '@angular/router';
import { User } from 'src/app/demo/api/users';
import { ActivatedRoute } from '@angular/router';
import { Inventory_detail } from 'src/app/demo/api/inventory_detail';

@Component({
  providers: [MessageService],
  templateUrl: './inventorydetail-m.component.html',
  styleUrls: ['./inventorydetail-m.component.scss']
})
export class InventorydetailMComponent {

  inventoryDialog: boolean = false;
  editInventoryDialog: boolean = false;

  deleteInventoryDialog: boolean = false;

  deleteInventoriesDialog: boolean = false;
  id: number = 0
  inventories: Inventory_header[] = [];
  binnacle: Binnacle={};
  inventory: Inventory_header = {
    Inventory_details: []
  };
  inventory_details:Inventory_detail[]=[]
  userData?: User
  selectedInventories: Inventory_detail[] = [];
  selectedStatus: any;
  submitted: boolean = false;

  cols: any[] = [];

  statuses: SelectItem[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private _api: ApiService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this._api.getTypeRequest('users/validate').subscribe((user: any) => {
      this.userData = user

      this.route.paramMap.subscribe(params => {
        const idf = params.get('id');
        if (idf !== null && idf !== undefined) {
          this.id = Number(idf)
          this._api.getByIdTypeRequest('inventories', this.id).subscribe((data: any) => {
            this.inventory = data
            this.inventory_details=this.inventory.Inventory_details ? this.inventory.Inventory_details : [];
            console.log(this.inventory)
            console.log(this.inventory_details)

          }, err => {
            console.log(err)
          });
        }
  
  
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
    // this.inventories = this.inventories.filter(val => !this.selectedInventories.includes(val));
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
