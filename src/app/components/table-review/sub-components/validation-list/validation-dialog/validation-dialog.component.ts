import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectOptions } from 'src/app/models/select-options';
import { Expense } from 'src/app/models/expense';

@Component({
  selector: 'app-validation-dialog',
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.scss'],
})
export class ValidationDialogComponent {
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<ValidationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Expense
  ) {
    console.log(data);
    this.local_data = { ...data };
  }

  validationTypes: SelectOptions[] = [
    { value: 'full', viewValue: 'Full' },
    { value: 'partial', viewValue: 'Partial' },
    { value: 'denied', viewValue: 'Denied' },
  ];

  setValidation() {
    this.local_data.isManuallyValidated = true;
    this.dialogRef.close({ data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
