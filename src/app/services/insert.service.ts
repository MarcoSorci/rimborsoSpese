import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})

export class InsertService {

  constructor(private router: Router) { }

  EXPENSE_DATA: Expense[] = [];

  insert(newExpense: Expense){
    //const newExpense: Expense = {date: '01/2022', type: 'Taxi', amount: 10, hasReceipt: true}
    this.EXPENSE_DATA.push(newExpense)
    this.router.navigate(['table']);
  }
}


