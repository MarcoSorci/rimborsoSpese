import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDateFormats,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
} from '@angular/material/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';

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

export interface Types {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS }],
})
export class InsertComponent {
  dateVal = new FormControl('', [Validators.required]);
  typeVal = new FormControl('', [Validators.required]);
  amountVal = new FormControl('', [Validators.required, Validators.min(1)]);
  receiptVal = new FormControl('', [Validators.required]);

  constructor(
    public serv: ExpenseService,
    public userServ: UserService,
    public router: Router
  ) {}

  selected = '';

  expenseModel: Expense = {
    date: '',
    type: '',
    amount: 0,
    hasReceipt: '',
    notes: '',
    id: '',
  };

  expenseTypes: Types[] = [
    { value: 'transport', viewValue: 'Transport' },
    { value: 'lodging', viewValue: 'Lodging' },
    { value: 'food', viewValue: 'Food' },
    { value: 'other', viewValue: 'Other' },
  ];

  receiptBool: Types[] = [
    { value: 'true', viewValue: 'Yes' },
    { value: 'false', viewValue: 'No' },
  ];

  insert(newExpense: Expense) {
    newExpense.userName = this.userServ.user?.username;
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
}
