import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Administrator',
                items: [
                    { label: 'Companies', icon: 'pi pi-fw pi-home', routerLink: ['/administrator/company-crud'] },
                    { label: 'Users', icon: 'pi pi-fw pi-home', routerLink: ['/administrator/users'] },
                ]
            },
            {
                label: 'Managament',
                items: [
                    { label: 'Location', icon: 'pi pi-fw pi-home', routerLink: ['/management/location'] },
                    { label: 'employee', icon: 'pi pi-fw pi-home', routerLink: ['/management/employee'] },
                    { label: 'device', icon: 'pi pi-fw pi-home', routerLink: ['/management/device'] },
                    { label: 'tax', icon: 'pi pi-fw pi-home', routerLink: ['/management/tax'] },
                    { label: 'category', icon: 'pi pi-fw pi-home', routerLink: ['/management/category'] },
                    { label: 'Unit Measure', icon: 'pi pi-fw pi-home', routerLink: ['/management/unitMeasure'] },
                    { label: 'Products', icon: 'pi pi-fw pi-home', routerLink: ['/management/product'] },
                    { label: 'Stock', icon: 'pi pi-fw pi-home', routerLink: ['/management/stock'] },
                    {
                        label: 'billing',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'New Transaction',
                                icon: 'pi pi-fw pi-home',
                                routerLink: ['/management/transaction']
                            },
                            {
                                label: 'List Transactions',
                                icon: 'pi pi-fw pi-home',
                                routerLink: ['/management/transactionlist']
                            },
                            
                        ]
                    },
                    {
                        label: 'Inventory',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Calculate Inventory',
                                icon: 'pi pi-fw pi-home',
                                routerLink: ['/management/inventory']
                            },
                            {
                                label: 'List Inventory',
                                icon: 'pi pi-fw pi-home',
                                routerLink: ['/management/inventorylist']
                            },
                            
                        ]
                    },
                ]
            },
           
        ];
    }
}
