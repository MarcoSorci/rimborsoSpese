import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly EXP_API =
    'https://6248018d4bd12c92f4064156.mockapi.io/expenses';

  public expenseList = new BehaviorSubject<Expense[]>([]);

  constructor(private http: HttpClient) {
  }

  limitConfig = { transport: 20, lodging: 80, food: 30, other: 70 };

  getExpenses() {
    this.http
      .get<Expense[]>(this.EXP_API)
      .subscribe((exp) => this.expenseList.next(exp));
  }

  insert(newExpense: Expense) {
    return this.http.post(this.EXP_API, newExpense);
  }

  addRequest(exp: any) {
    let expArray = this.expenseList.value;
    expArray.push(exp);
    this.expenseList.next(expArray);
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
    } else {
      exp.approval = 'denied';
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