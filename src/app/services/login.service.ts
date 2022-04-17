import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly USER_API = 'https://6248018d4bd12c92f4064156.mockapi.io/usersExp'
  constructor(private router: Router, private http: HttpClient) {}

  loggedUser: User[] = [];
  isAuth = false;

  login(newUser: User) {
    this.loggedUser.push(newUser);
    this.isAuth = true;
    this.router.navigate(['table']);
  }
  
  logout() {
    this.isAuth = false;
    this.router.navigate(['login']);
  }
}
