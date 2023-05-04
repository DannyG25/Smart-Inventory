import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Unit_measure } from 'src/app/demo/api/unit_measure';

@Component({
  providers: [MessageService],
  templateUrl: './measure-m.component.html',
  styleUrls: ['./measure-m.component.scss']
})
export class MeasureMComponent {
  unit_measureDialog: boolean = false;
  editUnit_measureDialog: boolean = false;

  deleteUnit_measureDialog: boolean = false;

  deleteUnit_measuresDialog: boolean = false;

  unit_measures: Unit_measure[] = [];

  unit_measure: Unit_measure = {};
  userData?: Unit_measure
  selectedUnit_measures: Unit_measure[] = [];
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
    this._api.getTypeRequest('unit_measures').subscribe((data: any) => {
      this.unit_measures = data
    }, err => {
      console.log(err)
    });
    this.cols = [
      { field: 'unit_measure', header: 'Unit_measure' }
    ];


  }

  openNew() {

    // this.statuses=  [];
    // this.unit_measureDialog = true;
    // this.unit_measures.forEach(comp => {
    //   const statusElement = {
    //     label: comp.Unit_measure_name,
    //     value: comp.ID
    //   };
    //   this.statuses.push(statusElement);
    // });

    this.unit_measure = {};
    this.submitted = false;
    this.unit_measureDialog = true;
  }



  deleteSelectedUnit_measures() {
    this.deleteUnit_measuresDialog = true;
  }

  editUnit_measure(unit_measure: Unit_measure) {
    this.unit_measure = { ...unit_measure };
    this.editUnit_measureDialog = true;
  }

  deleteUnit_measure(unit_measure: Unit_measure) {
    this.deleteUnit_measureDialog = true;
    this.unit_measure = { ...unit_measure };
  }

  confirmDeleteSelected() {
    this.deleteUnit_measuresDialog = false;
    console.log(this.selectedUnit_measures)
    for (let selectUnit_measure of this.selectedUnit_measures) {
      this._api.deleteTypeRequest('unit_measures', selectUnit_measure.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('unit_measures').subscribe((data: any) => this.unit_measures = data);
    this.unit_measures = this.unit_measures.filter(val => !this.selectedUnit_measures.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Unit_measures Deleted', life: 3000 });

    this.selectedUnit_measures = [];

  }

  confirmDelete() {
    this.deleteUnit_measureDialog = false;
    this._api.deleteTypeRequest('unit_measures', this.unit_measure.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Unit_measure Deleted', life: 3000 });
      this.unit_measure = {};
      this._api.getTypeRequest('unit_measures').subscribe((data: any) => this.unit_measures = data);
    }, err => {
      console.log(err)
    });

  }

  hideDialog() {
    this.unit_measureDialog = false;
    this.submitted = false;
    this.editUnit_measureDialog=false;
  }

  saveUnit_measure() {
    this.submitted = true;
    if (this.unit_measure.Uni_measure?.trim()) {
      console.log(this.unit_measure)
      // this.unit_measure.Company_id=this.Unit_measureData?.Company_id
      this._api.postTypeRequest('unit_measures', this.unit_measure).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Unit_measure Created', life: 3000 });
        this._api.getTypeRequest('unit_measures').subscribe((data: any) => this.unit_measures = data);
      }, err => {
        console.log(err)
      });
      this.unit_measureDialog = false;
      this.unit_measure = {};
    }
  }
  saveEditUnit_measure() {
    this.submitted = true;
    if (this.unit_measure.Uni_measure?.trim()) {
      // console.log(this.unit_measure.Unit_measure_names)
      // this.unit_measure.Company_id=this.Unit_measureData?.Company_id
      this._api.putTypeRequest('unit_measures', this.unit_measure).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Unit_measure Updated', life: 3000 });

        console.log()
        this._api.getTypeRequest('unit_measures').subscribe((data: any) => this.unit_measures = data);
      }, err => {
        console.log(err)
      });
      this.editUnit_measureDialog = false;
      this.unit_measure = {};
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
