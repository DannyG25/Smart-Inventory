import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Movement } from 'src/app/demo/api/movement';

@Component({
  providers: [MessageService],
  templateUrl: './movement-m.component.html',
  styleUrls: ['./movement-m.component.scss']
})
export class MovementMComponent {
  movementDialog: boolean = false;
  editMovementDialog: boolean = false;

  deleteMovementDialog: boolean = false;

  deleteMovementsDialog: boolean = false;

  movements: Movement[] = [];

  movement: Movement = {};
  userData?: Movement
  selectedMovements: Movement[] = [];
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
    this._api.getTypeRequest('movements').subscribe((data: any) => {
      this.movements = data
    }, err => {
      console.log(err)
    });
    this.cols = [
      { field: 'movement', header: 'Movement' }
    ];


  }

  openNew() {

    // this.statuses=  [];
    // this.movementDialog = true;
    // this.movements.forEach(comp => {
    //   const statusElement = {
    //     label: comp.Mov_name,
    //     value: comp.ID
    //   };
    //   this.statuses.push(statusElement);
    // });

    this.movement = {};
    this.submitted = false;
    this.movementDialog = true;
  }



  deleteSelectedMovements() {
    this.deleteMovementsDialog = true;
  }

  editMovement(movement: Movement) {
    this.movement = { ...movement };
    this.editMovementDialog = true;
  }

  deleteMovement(movement: Movement) {
    this.deleteMovementDialog = true;
    this.movement = { ...movement };
  }

  confirmDeleteSelected() {
    this.deleteMovementsDialog = false;
    console.log(this.selectedMovements)
    for (let selectMovement of this.selectedMovements) {
      this._api.deleteTypeRequest('movements', selectMovement.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('movements').subscribe((data: any) => this.movements = data);
    this.movements = this.movements.filter(val => !this.selectedMovements.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Movements Deleted', life: 3000 });

    this.selectedMovements = [];

  }

  confirmDelete() {
    this.deleteMovementDialog = false;
    this._api.deleteTypeRequest('movements', this.movement.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Movement Deleted', life: 3000 });
      this.movement = {};
      this._api.getTypeRequest('movements').subscribe((data: any) => this.movements = data);
    }, err => {
      console.log(err)
    });

  }

  hideDialog() {
    this.movementDialog = false;
    this.submitted = false;
    this.editMovementDialog=false;
  }

  saveMovement() {
    this.submitted = true;
    if (this.movement.Mov_type?.trim()) {
      console.log(this.movement)
      // this.movement.Company_id=this.MovementData?.Company_id
      this._api.postTypeRequest('movements', this.movement).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Movement Created', life: 3000 });
        this._api.getTypeRequest('movements').subscribe((data: any) => this.movements = data);
      }, err => {
        console.log(err)
      });
      this.movementDialog = false;
      this.movement = {};
    }
  }
  saveEditMovement() {
    this.submitted = true;
    if (this.movement.Mov_type?.trim()) {
      console.log(this.movement.Mov_type)
      // this.movement.Company_id=this.MovementData?.Company_id
      this._api.putTypeRequest('movements', this.movement).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Movement Updated', life: 3000 });

        console.log()
        this._api.getTypeRequest('movements').subscribe((data: any) => this.movements = data);
      }, err => {
        console.log(err)
      });
      this.editMovementDialog = false;
      this.movement = {};
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
