import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(public serv: UserService, private router: Router,
    private snack: MatSnackBar) {}

  userModel = this.serv.userModel; 

  login() {
    const spinner = document.getElementById('spinner-overlay');
    if (spinner) {
      spinner.style.display = 'flex';
    }
    this.serv
      .login(this.userModel.username, this.userModel.password)
      .subscribe({
        next: (user) => {
          this.snack.dismiss();
          if (user) {
            this.router.navigate(['table']);
          } else {
            if (spinner) {
              spinner.style.display = 'none';
            }
            this.snack.open('User not Found!', '', {
              duration: 2 * 1000,
            });
          }
        },
        error: (error) => this.snack.open(error.message, 'close'),
      });
  }
}
