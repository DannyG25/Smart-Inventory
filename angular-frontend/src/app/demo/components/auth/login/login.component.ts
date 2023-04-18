import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/demo/service/api.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/demo/service/authentication.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
    form!: FormGroup;

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(
        public layoutService: LayoutService,
        private _api: ApiService,
        private _auth: AuthenticationService,
        private router: Router,
        private cookieService: CookieService,
        public fb: FormBuilder,
        // private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            user_username: ['', Validators.required],
            user_password: ['', Validators.required]
        });

    }

    login() {
        let b = this.form.value
        console.log(b)
        this._api.postTypeRequest('users/login', b).subscribe((res: any) => {
            console.log(res)
            if (res) {
                console.log(res.token)
                this._auth.setDataInCookie('Authorization',res.token)
                // const cookieValue = res.headers.get('Authorization');
                // console.log(cookieValue)
                // document.cookie = cookieValue;
                this.router.navigate(['/dashboard']);
            }
        }, (err: any) => {
            console.log(err)
            this.form.reset();
            // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

        });
    }

}
