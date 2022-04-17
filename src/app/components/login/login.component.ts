import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  usernameVal = new FormControl('', [Validators.required]);
  passwordVal = new FormControl('', [Validators.required]);

  constructor(public serv: LoginService) {}

  userModel: User = {
    username: '',
    password: '',
  };

  login(newUser: User) {
    newUser = this.userModel;
    this.serv.login(newUser);
  }
}
