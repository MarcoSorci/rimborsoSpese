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

  onDaySelected(day: Day) {
    this.leaveModel.date = new Date(day.year,day.monthIndex,day.number + 1).toUTCString().substring(5,16);
    this.trigger.closeMenu();
  }
}
