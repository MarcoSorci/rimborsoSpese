import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpTypes } from 'src/app/models/exp-types';
import { Expense } from 'src/app/models/expense';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent {
  action: string;
  local_data: any;

  expenseTypes: ExpTypes[] = [
    { value: 'transport', viewValue: 'Transport' },
    { value: 'lodging', viewValue: 'Lodging' },
    { value: 'food', viewValue: 'Food' },
    { value: 'other', viewValue: 'Other' },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Expense
  ) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
