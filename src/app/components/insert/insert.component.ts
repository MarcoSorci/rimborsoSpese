import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDateFormats,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
} from '@angular/material/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/models/expense';
import { InsertService } from 'src/app/services/insert.service';

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

  constructor(public serv: InsertService, public router: Router) {}

  selected = '';

  expenseModel: Expense = {
    date: '',
    type: '',
    amount: 0,
    hasReceipt: '',
    notes: '',
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
    newExpense = this.expenseModel;
    this.serv.insert(newExpense);
    this.router.navigate(['table']);
  }
}
