import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USER_API =
    'https://6248018d4bd12c92f4064156.mockapi.io/usersExp';

  public userList = new BehaviorSubject<User[]>([]);

  constructor(private router: Router, private http: HttpClient) {}

  public user?: User;
  public isAuth = false;

  login(username: string, psw: string) {
   return this.http.get<User[]>(this.USER_API + '?username=' + username).pipe(
      map((users: User[]) => {
        const user = users.find(
          (u) => u.username === username && u.password === psw
        );
        if (user) {
          this.user = user;
          this.isAuth = true;
        }
        return user;
      })
    )
  }

  logout() {
    this.isAuth = false;
    this.user = undefined;
    this.router.navigate(['login']);
  }

  register(newUser: User) {
    this.isAuth = true;
    return this.http.post<User>(this.USER_API, newUser);
  }

  addUser(user: any) {
    let userArray = this.userList.value;
    userArray.push(user);
    this.userList.next(userArray);
  }
}
