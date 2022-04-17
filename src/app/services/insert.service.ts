import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root',
})
export class InsertService {

  public expenseList = new BehaviorSubject<Expense[]>([]);

  private readonly EXP_API = 'https://6248018d4bd12c92f4064156.mockapi.io/expenses'
  constructor(private http: HttpClient) {}

  EXPENSE_DATA: Expense[] = [];
  
  limitConfig = { transport: 20, lodging: 80, food: 30, other: 70 };

  

  insert(newExpense: Expense) {
    //this.EXPENSE_DATA.push(newExpense);
    return this.http.post(this.EXP_API, newExpense)
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
