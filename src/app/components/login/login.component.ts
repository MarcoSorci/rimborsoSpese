import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { InsertService } from 'src/app/services/insert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  usernameVal = new FormControl('', [Validators.required]);
  passwordVal = new FormControl('', [Validators.required]);

  constructor(public serv: InsertService) {}

  userModel: User = {
    username: '',
    password: '',
  };

  login(newUser: User) {
    newUser = this.userModel;
    this.serv.login(newUser);
  }
}
