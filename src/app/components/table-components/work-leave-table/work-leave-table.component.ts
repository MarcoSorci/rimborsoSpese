import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
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
  displayedColumns: string[] = ['date', 'hours', 'type', 'approval', 'notes'];

  dataSource = this.serv.workLeaveList;
  constructor(
    public dialog: MatDialog,
    public serv: WorkLeaveService,
    public userServ: UserService,
    public dialogServ: DialogService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.serv.getWorkLeaves();
    if (this.userServ.user?.type === 'admin') {
      this.displayedColumns.unshift('userName');
      this.displayedColumns.push('actions');
    }
  }

  sortData(sort: Sort) {
    // const data = this.dataSource.slice();
    // this.dataSource = data.sort((a, b) => {
    //   const isAsc = sort.direction === 'asc';
    //   switch (sort.active) {
    //     case 'date':
    //       return this.compare(a.date, b.date, isAsc);
    //     case 'hours':
    //       return this.compare(a.hours, b.hours, isAsc);
    //     case 'type':
    //       return this.compare(a.type, b.type, isAsc);
    //     case 'approval':
    //       return this.compare(a.approval, b.approval, isAsc);
    //     default:
    //       return 0;
    //   }
    // });
  }

  compare(
    a: number | string | Date,
    b: number | string | Date,
    isAsc: boolean
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
