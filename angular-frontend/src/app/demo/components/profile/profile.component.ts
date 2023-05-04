import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { User } from '../../api/users';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  UserData?: User

  constructor(
    private _api: ApiService,
  ) { }
  ngOnInit(): void {
    console.log("en el oninit")
    this.loadProfile();
  }

  loadProfile() {
    console.log("entro")
    this._api.getTypeRequest('users/validate').subscribe((user: any) => {
      this.UserData = user
    }, (err: any) => {
      console.log(err)

    });
  }

}
