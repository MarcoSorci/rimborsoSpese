import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Day } from 'src/app/models/day';
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
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

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

  onDaySelected(day: Day) {
    this.local_data.date = new Date(day.year,day.monthIndex,day.number + 1).toUTCString().substring(5,16);
    this.trigger.closeMenu();
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  

}
