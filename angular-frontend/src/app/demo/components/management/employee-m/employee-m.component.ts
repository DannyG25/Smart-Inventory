import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { User } from 'src/app/demo/api/users';

@Component({
  providers: [MessageService],
  templateUrl: './employee-m.component.html',
  styleUrls: ['./employee-m.component.scss']
})
export class EmployeeMComponent {
  userDialog: boolean = false;
  editUserDialog: boolean = false;

  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  users: User[] = [];

  user: User = {};
  UserData?: User
  selectedUsers: User[] = [];
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
      this.UserData = user
    }, (err: any) => {
      console.log(err)
    });
    this._api.getTypeRequest('users').subscribe((data: any) => {
      this.users = data
    }, err => {
      console.log(err)
    });
    this.cols = [
      { field: 'user', header: 'User' }
    ];


  }

  openNew() {

    // this.statuses=  [];
    // this.userDialog = true;
    // this.users.forEach(comp => {
    //   const statusElement = {
    //     label: comp.User_name,
    //     value: comp.ID
    //   };
    //   this.statuses.push(statusElement);
    // });

    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }



  deleteSelectedUsers() {
    this.deleteUsersDialog = true;
  }

  editUser(user: User) {
    this.user = { ...user };
    this.editUserDialog = true;
  }

  deleteUser(user: User) {
    this.deleteUserDialog = true;
    this.user = { ...user };
  }

  confirmDeleteSelected() {
    this.deleteUsersDialog = false;
    console.log(this.selectedUsers)
    for (let selectUser of this.selectedUsers) {
      this._api.deleteTypeRequest('users', selectUser.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('users').subscribe((data: any) => this.users = data);
    this.users = this.users.filter(val => !this.selectedUsers.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });

    this.selectedUsers = [];

  }

  confirmDelete() {
    this.deleteUserDialog = false;
    this._api.deleteTypeRequest('users', this.user.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      this.user = {};
      this._api.getTypeRequest('users').subscribe((data: any) => this.users = data);
    }, err => {
      console.log(err)
    });

  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
    this.editUserDialog=false;
  }

  saveUser() {
    this.submitted = true;
    if (this.user.User_names?.trim()) {
      console.log(this.user)
      this.user.Company_id=this.UserData?.Company_id
      this._api.postTypeRequest('users', this.user).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
        this._api.getTypeRequest('users').subscribe((data: any) => this.users = data);
      }, err => {
        console.log(err)
      });
      this.userDialog = false;
      this.user = {};
    }
  }
  saveEditUser() {
    this.submitted = true;
    if (this.user.User_names?.trim()) {
      console.log(this.user.User_names)
      this.user.Company_id=this.UserData?.Company_id
      this._api.putTypeRequest('users', this.user).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });

        console.log()
        this._api.getTypeRequest('users').subscribe((data: any) => this.users = data);
      }, err => {
        console.log(err)
      });
      this.editUserDialog = false;
      this.user = {};
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
