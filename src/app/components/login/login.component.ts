import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { InsertService } from 'src/app/services/insert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router, private serv: InsertService) {}

  userModel: User = {
    username: '',
    password: ''
  }

  login(newUser:User) {
    newUser = this.userModel
    this.serv.login(newUser)
  }
}
