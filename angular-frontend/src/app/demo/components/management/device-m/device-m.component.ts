import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/demo/service/api.service';
import { SelectItem } from 'primeng/api';
import { Device } from 'src/app/demo/api/device';
import { Binnacle } from 'src/app/demo/api/binnacle';
import { Router } from '@angular/router';
@Component({
  providers: [MessageService],
  templateUrl: './device-m.component.html',
  styleUrls: ['./device-m.component.scss']
})
export class DeviceMComponent {
  deviceDialog: boolean = false;
  editDeviceDialog: boolean = false;

  deleteDeviceDialog: boolean = false;

  deleteDevicesDialog: boolean = false;

  devices: Device[] = [];
  binnacle: Binnacle={};
  device: Device = {
    Binnacles: []
  };
  userData?: Device
  selectedDevices: Device[] = [];
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
      this._api.getAllByIdTypeRequest('devices/devicesid',this.userData?.Company_id ?? 0).subscribe((data: any) => {
        this.devices = data
      }, err => {
        console.log(err)
      });
    }, (err: any) => {
      console.log(err)
    });
    
    
    this.cols = [
      { field: 'device', header: 'Device' }
    ];


  }

  openNew() {

    // this.statuses=  [];
    // this.deviceDialog = true;
    // this.devices.forEach(comp => {
    //   const statusElement = {
    //     label: comp.Device_name,
    //     value: comp.ID
    //   };
    //   this.statuses.push(statusElement);
    // });

    this.device = {
      Binnacles:[]
    };
    this.submitted = false;
    this.deviceDialog = true;
  }



  deleteSelectedDevices() {
    this.deleteDevicesDialog = true;
  }

  editDevice(device: Device) {
    this.device = { ...device };
    this.editDeviceDialog = true;
  }

  deleteDevice(device: Device) {
    this.deleteDeviceDialog = true;
    this.device = { ...device };
  }
  viewBinnacles(device: Device){
    this.router.navigate(['/management/binnacle'], { queryParams: { id: device.ID } });
  }

  confirmDeleteSelected() {
    this.deleteDevicesDialog = false;
    console.log(this.selectedDevices)
    for (let selectDevice of this.selectedDevices) {
      this._api.deleteTypeRequest('devices', selectDevice.ID).subscribe((res: any) => {
      }, err => {
        console.log(err)
      });
    }
    // this._api.getTypeRequest('devices').subscribe((data: any) => this.devices = data);
    this.devices = this.devices.filter(val => !this.selectedDevices.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Devices Deleted', life: 3000 });

    this.selectedDevices = [];

  }

  confirmDelete() {
    this.deleteDeviceDialog = false;
    this._api.deleteTypeRequest('devices', this.device.ID).subscribe((res: any) => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Deleted', life: 3000 });
      this.device = {
        Binnacles:[]
      };
      this._api.getAllByIdTypeRequest('devices/devicesid',this.userData?.Company_id ?? 0).subscribe((data: any) => this.devices = data);
    }, err => {
      console.log(err)
    }
    );

  }

  hideDialog() {
    this.deviceDialog = false;
    this.submitted = false;
    this.editDeviceDialog=false;
  }

  saveDevice() {
    this.submitted = true;
    if (this.device.Dev_antenna?.trim()) {
      
      this.device.Company_id=this.userData?.Company_id
      this.device.Binnacles?.push(this.binnacle)
      console.table(this.device)
      
      this._api.postTypeRequest('devices', this.device).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Created', life: 3000 });
        this._api.getAllByIdTypeRequest('devices/devicesid',this.userData?.Company_id ?? 0).subscribe((data: any) => this.devices = data);      }, err => {
        console.log(err)
      });
      this.deviceDialog = false;
      this.device = {
        Binnacles:[]
      };
      this.binnacle={}
    }
  }
  saveEditDevice() {
    this.submitted = true;
    if (this.device.Dev_antenna?.trim()) {
      // console.log(this.device.Device_names)
      this.device.Company_id=this.userData?.Company_id
      this._api.putTypeRequest('devices', this.device).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Device Updated', life: 3000 });

        console.log()
        this._api.getAllByIdTypeRequest('devices/devicesid',this.userData?.Company_id ?? 0).subscribe((data: any) => this.devices = data);      }, err => {
        console.log(err)
      });
      this.editDeviceDialog = false;
      this.device = {
        Binnacles:[]
      };
      this.binnacle={}
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
