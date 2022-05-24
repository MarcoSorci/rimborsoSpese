import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  constructor(public serv: UserService, private router: Router) {}

  userModel = this.serv.userModel; 
  spinnerVisible = false;

  registerEmployee(newUser: User) {
    this.spinnerVisible = true;
    newUser = this.userModel;
    newUser.type = 'employee';
    this.serv.register(newUser).subscribe({
      next: () => this.router.navigate(['table']),
      error: () => {},
    });
  }

  registerAdmin(newUser: User) {
    this.spinnerVisible = true;
    newUser = this.userModel;
    newUser.type = 'admin';
    this.serv.register(newUser).subscribe({
      next: () => this.router.navigate(['table']),
      error: () => {},
    });
  }
}
