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

  onRangeSelect(range: Day[]) {
    let start = range[0];
    let end = range[range.length - 1];
    let startDate = new Date(start.year, start.monthIndex, start.number + 1);
    let endDate = new Date(end.year, end.monthIndex, end.number + 1);
    if (startDate && endDate) {
      this.local_data.date =
        startDate.toUTCString().substring(5, 16) +
        ' - ' +
        endDate.toUTCString().substring(5, 16);
      this.local_data.totalDays = (this.dateDiffInDays(startDate, endDate) + 1);
      this.trigger.closeMenu();
    }
  }


dateDiffInDays(a:Date, b:Date) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  

}
