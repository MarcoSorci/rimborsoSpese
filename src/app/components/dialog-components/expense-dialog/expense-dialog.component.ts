import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectOptions } from 'src/app/models/select-options';
import { Expense } from 'src/app/models/expense';
import { UserService } from 'src/app/services/user.service';
import { GRI_DATE_FORMATS } from '../../insert-components/exp-insert/exp-insert.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { Day } from 'src/app/models/day';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS }],

})
export class ExpenseDialogComponent {
  action: string;
  local_data: any;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  expenseTypes: SelectOptions[] = [
    { value: 'transport', viewValue: 'Transport' },
    { value: 'lodging', viewValue: 'Lodging' },
    { value: 'food', viewValue: 'Food' },
    { value: 'other', viewValue: 'Other' },
  ];

   validationTypes: SelectOptions[] = [
    { value: 'full', viewValue: 'Full' },
    { value: 'partial', viewValue: 'Partial' },
    { value: 'denied', viewValue: 'Denied' },
  ];

  constructor(
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Expense,
    public userServ: UserService,
  ) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  onDaySelected(day: Day) {
    this.local_data.date = new Date(day.year,day.monthIndex,day.number + 1).toUTCString().substring(8,16);
    this.trigger.closeMenu();
  }

  doAction() {
    if (this.local_data.approval !== this.data.approval || this.local_data.reimbursement !== this.data.reimbursement) {
      this.local_data.isManuallyValidated = true;
    }
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
