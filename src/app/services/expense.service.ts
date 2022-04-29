import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../models/expense';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly EXP_API =
    'https://6248018d4bd12c92f4064156.mockapi.io/expenses';

  public expenseList = new BehaviorSubject<Expense[]>([]);
  public clickedRows = new Set<Expense>();

  constructor(private http: HttpClient, private userServ: UserService) {}

  getExpenses() {
    let query = '';
    if (this.userServ.user?.type !== 'admin') {
      query = '?userId=' + this.userServ.user?.id;
    }
    this.http
      .get<Expense[]>(this.EXP_API + query)
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

  delete(id: string) {
    return this.http.delete<any>(this.EXP_API + '/' + id);
  }

  update(exp: Expense) {
    return this.http.put<any>(this.EXP_API + '/' + exp.id, exp);
  }
}
