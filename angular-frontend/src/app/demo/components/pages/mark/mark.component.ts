import { Component, OnInit } from '@angular/core';
import { Mark } from 'src/app/demo/api/mark';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { delay } from 'rxjs/operators';

@Component({
  templateUrl: './mark.component.html',
  providers: [MessageService]
})
export class MarkComponent {

  markDialog: boolean = false;
  editMarkDialog: boolean = false;

  deleteMarkDialog: boolean = false;

  deleteMarksDialog: boolean = false;

  marks: Mark[] = [];

  mark: Mark = {};

  selectedMarks: Mark[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private _api: ApiService,
    private messageService: MessageService, 
   
  ) { }

  ngOnInit() {
    // this._api.getTypeRequest('marks').subscribe((data: any) => this.marks = data);

    this.cols = [
      { field: 'mark', header: 'Mark' }
    ];
  }
  openNew() {
    this.mark = {};
    this.submitted = false;
    this.markDialog = true;
  }

  deleteSelectedMarks() {
    this.deleteMarksDialog = true;
  }

  editMark(mark: Mark) {
    this.mark = { ...mark };
    this.editMarkDialog = true;
  }

  deleteMark(mark: Mark) {
    this.deleteMarkDialog = true;
    this.mark = { ...mark };
  }

  confirmDeleteSelected() {
    this.deleteMarksDialog = false;
    console.log(this.selectedMarks)
    for (let selectMark of this.selectedMarks) {
      this._api.deleteTypeRequest('marks', selectMark.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('marks').subscribe((data: any) => this.marks = data);
    this.marks = this.marks.filter(val => !this.selectedMarks.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Marks Deleted', life: 3000 });
    
    this.selectedMarks = [];

  }

  confirmDelete() {
    this.deleteMarkDialog = false;
    this._api.deleteTypeRequest('marks', this.mark.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mark Deleted', life: 3000 });
      this.mark = {};
      this._api.getTypeRequest('marks').subscribe((data: any) => this.marks = data);
    }, err => {
      console.log(err)
    });
    
  }

  hideDialog() {
    this.markDialog = false;
    this.submitted = false;
  }

  saveMark() {
    this.submitted = true;


    if (this.mark.Mar_name?.trim()) {
      console.log(this.mark.Mar_name)
      // this._api.postTypeRequest('marks', this.mark).subscribe((res: any) => {
      //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mark Created', life: 3000 });
      //   this.markDialog = false;
      //   this._api.getTypeRequest('marks').subscribe((data: any) => this.marks = data);
      //   this.mark={};
      // }, err => {
      //   console.log(err)
      // });


    }
    this.mark={};
  }
  saveEditMark() {
    this.submitted = true;


    if (this.mark.Mar_name?.trim()) {
      console.log(this.mark.Mar_name)
      this._api.putTypeRequest('marks', this.mark).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Mark Updated', life: 3000 });
        this.editMarkDialog = false;
        this._api.getTypeRequest('marks').subscribe((data: any) => this.marks = data);
      }, err => {
        console.log(err)
      });
    }
  }

  // findIndexById(id: string): number {
  //     let index = -1;
  //     for (let i = 0; i < this.marks.length; i++) {

  //         if (this.marks[i].ID === Number(id)) {
  //             index = i;
  //             break;
  //         }
  //     }

  //     return index;
  // }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
