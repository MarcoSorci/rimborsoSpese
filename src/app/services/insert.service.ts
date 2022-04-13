import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../models/expense';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class InsertService {

  public expenseList = new BehaviorSubject<Expense[]>([]);

  private readonly EXP_API = 'https://6248018d4bd12c92f4064156.mockapi.io/expenses'
  constructor(private router: Router, private http: HttpClient) {}

  EXPENSE_DATA: Expense[] = [];
  loggedUser: User[] = [];
  isAuth = false;
  limitConfig = { transport: 20, lodging: 80, food: 30, other: 70 };

  login(newUser: User) {
    this.loggedUser.push(newUser);
    this.isAuth = true;
    this.router.navigate(['table']);
  }

  insert(newExpense: Expense) {
    //this.EXPENSE_DATA.push(newExpense);
    return this.http.post(this.EXP_API, newExpense)
  }

  logout() {
    this.isAuth = false;
    this.router.navigate(['login']);
  }

  validate(exp: Expense) {
    if (exp.hasReceipt === 'true') {
      if (exp.type === 'transport') {
        exp.reimbursement = this.checkReimbursement(
          this.limitConfig.transport,
          exp
        );
      }
      if (exp.type === 'lodging') {
        exp.reimbursement = this.checkReimbursement(
          this.limitConfig.lodging,
          exp
        );
      }
      if (exp.type === 'food') {
        exp.reimbursement = this.checkReimbursement(this.limitConfig.food, exp);
      }
      if (exp.type === 'other') {
        exp.reimbursement = this.checkReimbursement(
          this.limitConfig.other,
          exp
        );
      }
    }
  }

  checkReimbursement(refValue: number, exp: Expense) {
    if (refValue > exp.amount) {
      exp.approval = 'full';
      return exp.amount;
    } else {
      exp.approval = 'partial';
      return refValue;
    }
  }
}
