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
    private snack: MatSnackBar) {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.login();
        }
      })
    }

  userModel = this.serv.userModel; 
  spinnerVisible = false;

  login() {
    this.spinnerVisible = true;
    this.serv
      .login(this.userModel.username, this.userModel.password)
      .subscribe({
        next: (user) => {
          this.snack.dismiss();
          if (user) {
            this.router.navigate(['table']);
          } else {
            this.spinnerVisible = false;
            this.snack.open('User not Found!', '', {
              duration: 2 * 1000,
            });
          }
        },
        error: (error) => this.snack.open(error.message, 'close'),
      });
  }
}
