import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USER_API =
    'https://6248018d4bd12c92f4064156.mockapi.io/usersExp';

  public userList = new BehaviorSubject<User[]>([]);

  constructor(private router: Router, private http: HttpClient) {}

  userModel: User = {
    username: '',
    password: '',
    type: '',
    id: '',
  };

  public user?: User;
  public isAuth = false;
  public userId? = '';

  login(username: string, psw: string) {
    return this.http.get<User[]>(this.USER_API + '?username=' + username).pipe(
      map((users: User[]) => {
        const user = users.find(
          (u) => u.username === username && u.password === psw
        );
        if (user) {
          this.user = user;
          this.isAuth = true;
          this.userId = user.id;
        }
        return user;
      })
    );
  }

  logout() {
    this.isAuth = false;
    this.user = undefined;
    this.router.navigate(['login']);
  }

  register(newUser: User) {
    if (!this.isAuth) {
      this.isAuth = true;
      this.user = newUser;
      this.userId = this.user.id;
    }
    return this.http.post<User>(this.USER_API, newUser);
  }

  getUserList() {
    return this.http
      .get<User[]>(this.USER_API)
      .subscribe((user) => this.userList.next(user));
  }

  delete(id: string) {
    return this.http.delete<any>(this.USER_API + '/' + id);
  }

  update(usr: User) {
    return this.http.put<any>(this.USER_API + '/' + usr.id, usr);
  }
}
