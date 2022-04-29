import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectOptions } from 'src/app/models/select-options';
import { WorkLeave } from 'src/app/models/work-leave';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-wl-dialog',
  templateUrl: './wl-dialog.component.html',
  styleUrls: ['./wl-dialog.component.scss']
})
export class WlDialogComponent {
  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<WlDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: WorkLeave,
    public userServ: UserService,
  ) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  leaveTypes: SelectOptions[] = [
    { value: 'sick', viewValue: 'Sick' },
    { value: 'vacation', viewValue: 'Vacation' },
    { value: 'other', viewValue: 'Other (specify in notes)' },
  ];

  validationTypes: SelectOptions[] = [
    { value: 'pending', viewValue: 'Pending' },
    { value: 'approved', viewValue: 'Approved' },
    { value: 'denied', viewValue: 'Denied' },
  ];

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  

}
