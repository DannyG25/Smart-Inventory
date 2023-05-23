import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Binnacle } from 'src/app/demo/api/binnacle';
import { User } from 'src/app/demo/api/users';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [MessageService],
  templateUrl: './binnacle.component.html',
  styleUrls: ['./binnacle.component.scss']
})
export class BinnacleComponent {
  binnacleDialog: boolean = false;
  editBinnacleDialog: boolean = false;
  id: number = 0
  deleteBinnacleDialog: boolean = false;

  deleteBinnaclesDialog: boolean = false;

  binnacles: Binnacle[] = [];

  binnacle: Binnacle = {};
  userData?: Binnacle
  selectedBinnacles: Binnacle[] = [];
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
        this._api.getAllByIdTypeRequest('binnacles/binnaclesid', this.id).subscribe((data: any) => {
          this.binnacles = data
        }, err => {
          console.log(err)
        });
      }


    });
    // this.id = parseInt( `${idf}`)
    // console.log(this.id)


    this.cols = [
      { field: 'binnacle', header: 'Binnacle' }
    ];



  }

  openNew() {

    // this.statuses=  [];
    // this.binnacleDialog = true;
    // this.binnacles.forEach(comp => {
    //   const statusElement = {
    //     label: comp.Mov_name,
    //     value: comp.ID
    //   };
    //   this.statuses.push(statusElement);
    // });

    this.binnacle = {};
    this.submitted = false;
    this.binnacleDialog = true;
  }



  deleteSelectedBinnacles() {
    this.deleteBinnaclesDialog = true;
  }

  editBinnacle(binnacle: Binnacle) {
    this.binnacle = { ...binnacle };
    this.editBinnacleDialog = true;
  }

  deleteBinnacle(binnacle: Binnacle) {
    this.deleteBinnacleDialog = true;
    this.binnacle = { ...binnacle };
  }

  confirmDeleteSelected() {
    this.deleteBinnaclesDialog = false;
    console.log(this.selectedBinnacles)
    for (let selectBinnacle of this.selectedBinnacles) {
      this._api.deleteTypeRequest('binnacles', selectBinnacle.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('binnacles').subscribe((data: any) => this.binnacles = data);
    this.binnacles = this.binnacles.filter(val => !this.selectedBinnacles.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Binnacles Deleted', life: 3000 });

    this.selectedBinnacles = [];

  }

  confirmDelete() {
    this.deleteBinnacleDialog = false;
    this._api.deleteTypeRequest('binnacles', this.binnacle.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Binnacle Deleted', life: 3000 });
      this.binnacle = {};
      this._api.getAllByIdTypeRequest('binnacles/binnaclesid', this.id).subscribe((data: any) => this.binnacles = data);
    }, err => {
      console.log(err)
    });

  }

  hideDialog() {
    this.binnacleDialog = false;
    this.submitted = false;
    this.editBinnacleDialog = false;
  }

  saveBinnacle() {
    this.submitted = true;
    if (this.binnacle.Bin_description?.trim()) {
      console.log(this.binnacle)
      this.binnacle.Device_id = this.id
      console.log(this.binnacle)
      this._api.postTypeRequest('binnacles', this.binnacle).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Binnacle Created', life: 3000 });
        this._api.getAllByIdTypeRequest('binnacles/binnaclesid', this.id).subscribe((data: any) => this.binnacles = data);
      }, err => {
        console.log(err)
      });
      this.binnacleDialog = false;
      this.binnacle = {};
    }
  }
  saveEditBinnacle() {
    this.submitted = true;
    if (this.binnacle.Bin_description?.trim()) {
      this.binnacle.Device_id = this.id
      this._api.putTypeRequest('binnacles', this.binnacle).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Binnacle Updated', life: 3000 });

        console.log()
        this._api.getAllByIdTypeRequest('binnacles/binnaclesid', this.id).subscribe((data: any) => this.binnacles = data);
      }, err => {
        console.log(err)
      });
      this.editBinnacleDialog = false;
      this.binnacle = {};
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
