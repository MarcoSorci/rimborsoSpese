import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  usernameVal = new FormControl('', [Validators.required]);
  passwordVal = new FormControl('', [Validators.required]);
  pswConfirmVal = new FormControl('', [Validators.required]);

  constructor(public serv: UserService) {}

  userModel: User = {
    username: '',
    password: '',
    type: '',
  };

  registerEmployee(newUser: User) {
    newUser = this.userModel;
    newUser.type = 'employee';
    this.serv.register(newUser);
  }

  registerAdmin(newUser: User) {
    newUser = this.userModel;
    newUser.type = 'admin';
    this.serv.register(newUser).subscribe({
      next: (user) => console.log(user),
      error: (e) => console.log(e),
    });
  }
}
