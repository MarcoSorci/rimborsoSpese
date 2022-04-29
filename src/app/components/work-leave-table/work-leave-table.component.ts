import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkLeave } from 'src/app/models/work-leave';
import { UserService } from 'src/app/services/user.service';
import { WorkLeaveService } from 'src/app/services/work-leave.service';
import { WlDialogComponent } from './wl-dialog/wl-dialog.component';

@Component({
  selector: 'app-work-leave-table',
  templateUrl: './work-leave-table.component.html',
  styleUrls: ['./work-leave-table.component.scss']
})
export class WorkLeaveTableComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public serv: WorkLeaveService,
    public userServ: UserService,

  ) {}

  displayedColumns: string[] = [
    'date',
    'hours',
    'type',
    'approval',
    'notes',
  ];

  dataSource = this.serv.workLeaveList;

  ngOnInit(): void {
    this.serv.getWorkLeaves();
    if (this.userServ.user?.type === 'admin') {
      this.displayedColumns.unshift('userName');
      this.displayedColumns.push('actions');
    }
  }


  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(WlDialogComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      } else if (result.event == 'Submit') {
        this.submitRowData(result.data);
      }
    });
  }

  submitRowData(newLeave: WorkLeave) {
    newLeave = this.serv.leaveModel;
    this.serv.insert(newLeave).subscribe({
      next: (data) => {
        this.serv.addRequest(data);
        console.log(data);
      },
      error: () => {},
    });
  }


  updateRowData(wl: WorkLeave) {
    this.serv.update(wl).subscribe({
      next: () => this.serv.getWorkLeaves()
    });
  }

  deleteRowData(wl: WorkLeave) {
    this.serv.delete(wl.id).subscribe({
      next: () => this.serv.getWorkLeaves()
    });
  }

}
