import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Day } from 'src/app/models/day';
import { SelectOptions } from 'src/app/models/select-options';
import { WorkLeave } from 'src/app/models/work-leave';
import { UserService } from 'src/app/services/user.service';
import { WorkLeaveService } from 'src/app/services/work-leave.service';

@Component({
  selector: 'app-wl-insert',
  templateUrl: './wl-insert.component.html',
  styleUrls: ['./wl-insert.component.scss'],
})
export class WlInsertComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  constructor(
    public serv: WorkLeaveService,
    public userServ: UserService,
    public router: Router
  ) {}

  leaveModel = this.serv.leaveModel;

  leaveTypes: SelectOptions[] = [
    { value: 'sick', viewValue: 'Sick' },
    { value: 'vacation', viewValue: 'Vacation' },
    { value: 'other', viewValue: 'Other (specify in notes)' },
  ];

  insert(newLeave: WorkLeave) {
    newLeave.userName = this.userServ.user?.username;
    newLeave.userId = this.userServ.user?.id;
    newLeave.approval = 'pending';
    newLeave = this.serv.leaveModel;
    this.serv.insert(newLeave).subscribe({
      next: (data) => {
        this.serv.addRequest(data);
        console.log(data);
      },
    });
    this.router.navigate(['/wl-table']);
  }

  onRangeSelect(range: Day[]) {
    let start = range[0];
    let end = range[range.length - 1];
    let startDate = new Date(start.year, start.monthIndex, start.number + 1);
    let endDate = new Date(end.year, end.monthIndex, end.number + 1);
    if (startDate && endDate) {
      this.leaveModel.date =
        startDate.toUTCString().substring(5, 16) +
        ' - ' +
        endDate.toUTCString().substring(5, 16);
      this.leaveModel.hours = (this.dateDiffInDays(startDate, endDate) + 1).toString();
      this.trigger.closeMenu();
    }
  }


dateDiffInDays(a:Date, b:Date) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}
}
