import { Component, Inject, Optional } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GRI_DATE_FORMATS } from 'src/app/components/insert/insert.component';
import { SelectOptions } from 'src/app/models/select-options';
import { Expense } from 'src/app/models/expense';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS }],

})
export class DialogBoxComponent {
  action: string;
  local_data: any;

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
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Expense,
    public userServ: UserService,
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
