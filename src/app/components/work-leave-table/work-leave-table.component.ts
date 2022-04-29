import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkLeave } from 'src/app/models/work-leave';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { WorkLeaveService } from 'src/app/services/work-leave.service';

@Component({
  selector: 'app-work-leave-table',
  templateUrl: './work-leave-table.component.html',
  styleUrls: ['./work-leave-table.component.scss'],
})
export class WorkLeaveTableComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public serv: WorkLeaveService,
    public userServ: UserService,
    public dialogServ: DialogService
  ) {}

  displayedColumns: string[] = ['date', 'hours', 'type', 'approval', 'notes'];

  dataSource = this.serv.workLeaveList;

  ngOnInit(): void {
    this.serv.getWorkLeaves();
    if (this.userServ.user?.type === 'admin') {
      this.displayedColumns.unshift('userName');
      this.displayedColumns.push('actions');
    }
  }


}
