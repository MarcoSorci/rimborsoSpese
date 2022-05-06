import { Component, ViewChild } from '@angular/core';
import {
  MatDateFormats,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
} from '@angular/material/core';
import { Router } from '@angular/router';
import { SelectOptions } from 'src/app/models/select-options';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';
import { Day } from 'src/app/models/day';
import { MatMenuTrigger } from '@angular/material/menu';

export const GRI_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'short',
    } as Intl.DateTimeFormatOptions,
  },
};



@Component({
  selector: 'app-exp-insert',
  templateUrl: './exp-insert.component.html',
  styleUrls: ['./exp-insert.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS }],
})
export class ExpInsertComponent {

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(
    public serv: ExpenseService,
    public userServ: UserService,
    public router: Router
  ) {}

  expenseModel: Expense = {
    date: '',
    type: '',
    amount: 0,
    hasReceipt: '',
    notes: '',
    id: '',
    userName: '',
  };


  expenseTypes: SelectOptions[] = [
    { value: 'transport', viewValue: 'Transport' },
    { value: 'lodging', viewValue: 'Lodging' },
    { value: 'food', viewValue: 'Food' },
    { value: 'other', viewValue: 'Other' },
  ];

  receiptBool: SelectOptions[] = [
    { value: 'true', viewValue: 'Yes' },
    { value: 'false', viewValue: 'No' },
  ];

  insert(newExpense: Expense) {
    if (this.userServ.user) {
      newExpense.userName = this.userServ.user?.username;
    }
    newExpense.userId = this.userServ.user?.id;
    newExpense = this.expenseModel;
    this.serv.insert(newExpense).subscribe({
      next: (data) => {
        this.serv.addRequest(data);
        console.log(data);
      },
      error: () => {},
    });
    this.router.navigate(['table']);
  }

  onDaySelected(day: Day) {
    this.expenseModel.date = new Date(day.year, day.monthIndex, day.number).toISOString();
    this.trigger.closeMenu();
  }
}
