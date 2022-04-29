import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectOptions } from 'src/app/models/select-options';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-userlist-dialog',
  templateUrl: './userlist-dialog.component.html',
  styleUrls: ['./userlist-dialog.component.scss']
})
export class UserlistDialogComponent{
  action: string;
  local_data: any;

  userRanks: SelectOptions[] = [
    { value: 'employee', viewValue: 'Employee' },
    { value: 'admin', viewValue: 'Admin' },
  ];

  constructor(
    public dialogRef: MatDialogRef<UserlistDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: User
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
