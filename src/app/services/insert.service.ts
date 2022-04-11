import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from '../models/expense';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class InsertService {
  constructor(private router: Router) {}

  EXPENSE_DATA: Expense[] = [];
  loggedUser: User[] = [];
  isAuth = false;

  login(newUser: User) {
    this.loggedUser.push(newUser);
    this.isAuth = true;
    this.router.navigate(['insert']);
  }

  insert(newExpense: Expense) {
    //const newExpense: Expense = {date: '01/2022', type: 'Taxi', amount: 10, hasReceipt: true}
    this.EXPENSE_DATA.push(newExpense);
    this.router.navigate(['table']);
  }

  logout(){
    this.isAuth = false
    this.router.navigate(['login'])
  }
}
