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
    providers: [MessageService],
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
    msgs: MessageService[] = [];
    password!: string;

    constructor(
        public layoutService: LayoutService,
        private _api: ApiService,
        private _auth: AuthenticationService,
        private router: Router,
        private cookieService: CookieService,
        public fb: FormBuilder,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            user_username: ['', Validators.required],
            user_password: ['', Validators.required]
        });

    }

    login() {
        let b = this.form.value
        
        this._api.postTypeRequest('users/login', b).subscribe((res: any) => {
            
            if (res) {
                this._auth.setDataInLocalStorage('Authorization',res.token)
                
                this.router.navigate(['/dashboard']);
            }

        }, (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect Email or Password', life: 3000 });
            this.form.reset();

        });
    }

}
