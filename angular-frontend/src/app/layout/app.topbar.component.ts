import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { ApiService } from '../demo/service/api.service';
import { AuthenticationService } from '../demo/service/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        private _api: ApiService,
        private _aut: AuthenticationService,
        private router: Router,
        public layoutService: LayoutService
        ) { }

    logOut(){
        this._aut.clearCookies();
        this.router.navigate(['/login']);
    }
    log(){
        console.log("entrol al verificar")
        this._api.getTypeRequest('users/validate').subscribe((res: any) => {
            console.log(res)

        }, (err: any) => {
            console.log(err)
            
        });
    }
}

