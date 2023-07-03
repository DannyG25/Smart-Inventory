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
                    { label: 'Companies', icon: 'pi pi-fw pi-building', routerLink: ['/administrator/company-crud'] },
                    { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/administrator/users'] },
                ]
            },
            {
                label: 'Managament',
                items: [
                    { label: 'Location', icon: 'pi pi-fw pi-map', routerLink: ['/management/location'] },
                    { label: 'employee', icon: 'pi pi-fw pi-users', routerLink: ['/management/employee'] },
                    { label: 'device', icon: 'pi pi-fw pi-server', routerLink: ['/management/device'] },
                    { label: 'tax', icon: 'pi pi-fw pi-percentage', routerLink: ['/management/tax'] },
                    { label: 'category', icon: 'pi pi-fw pi-tags', routerLink: ['/management/category'] },
                    { label: 'Unit Measure', icon: 'pi pi-fw pi-pencil', routerLink: ['/management/unitMeasure'] },
                    { label: 'Products', icon: 'pi pi-fw pi-gift', routerLink: ['/management/product'] },
                    { label: 'Stock', icon: 'pi pi-fw pi-th-large', routerLink: ['/management/stock'] },
                    {
                        label: 'billing',
                        icon: 'pi pi-fw pi-list',
                        items: [
                            {
                                label: 'New Transaction',
                                icon: 'pi pi-fw pi-shopping-cart',
                                routerLink: ['/management/transaction']
                            },
                            {
                                label: 'List Transactions',
                                icon: 'pi pi-fw pi-shopping-bag',
                                routerLink: ['/management/transactionlist']
                            },
                            
                        ]
                    },
                    {
                        label: 'Inventory',
                        icon: 'pi pi-fw pi-list',
                        items: [
                            {
                                label: 'Calculate Inventory',
                                icon: 'pi pi-fw pi-file-edit',
                                routerLink: ['/management/inventory']
                            },
                            {
                                label: 'List Inventory',
                                icon: 'pi pi-fw pi-file',
                                routerLink: ['/management/inventorylist']
                            },
                            
                        ]
                    },
                ]
            },
           
        ];
    }
}
