import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  adminPinVal = new FormControl('', [Validators.required, Validators.maxLength(4)]);

  constructor(public serv: UserService, private router: Router) {}

  userModel: User = {
    username: '',
    password: '',
    type: '',
  };

  registerEmployee(newUser: User) {
    const spinner = document.getElementById('spinner-overlay');
    if (spinner) {
      spinner.style.display = 'flex';
    }
    newUser = this.userModel;
    newUser.type = 'employee';
    this.serv.register(newUser).subscribe({
      next: () => this.router.navigate(['table']),
      error: () => {},
    });
  }

  registerAdmin(newUser: User) {
    const spinner = document.getElementById('spinner-overlay');
    if (spinner) {
      spinner.style.display = 'flex';
    }
    newUser = this.userModel;
    newUser.type = 'admin';
    this.serv.register(newUser).subscribe({
      next: () => this.router.navigate(['table']),
      error: () => {},
    });
  }
}
