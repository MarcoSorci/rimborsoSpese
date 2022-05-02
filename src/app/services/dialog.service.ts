import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../components/dialog-components/expense-dialog/expense-dialog.component';
import { WlDialogComponent } from '../components/dialog-components/wl-dialog/wl-dialog.component';
import { Expense } from '../models/expense';
import { WorkLeave } from '../models/work-leave';
import { ExpenseService } from './expense.service';
import { UserService } from './user.service';
import { WorkLeaveService } from './work-leave.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    public dialog: MatDialog,
    public serv: ExpenseService,
    public userServ: UserService,
    public wlServ: WorkLeaveService
  ) {}

  clickedRows = this.serv.clickedRows;

  openDialog(action: any, obj: any) {
    this.clickedRows.clear();
    obj.action = action;
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Update') {
        this.updateExpData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteExpData(result.data);
      }
    });
  }

  updateExpData(exp: Expense) {
    this.serv.update(exp).subscribe({
      next: () => this.serv.getExpenses(),
      complete: () => this.clickedRows.clear(),
    });
  }

  deleteExpData(exp: Expense) {
    this.serv.delete(exp.id).subscribe({
      next: () => this.serv.getExpenses(),
      complete: () => this.clickedRows.clear(),
    });
  }

  openWorkLeaveDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(WlDialogComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Update') {
        this.updateWLData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteWLData(result.data);
      }
    });
  }

  updateWLData(wl: WorkLeave) {
    if (wl.approval !== 'pending') {
      wl.approvalDate = new Date();
      wl.approverName = this.userServ.user?.username;
    }
    this.wlServ.update(wl).subscribe({
      next: () => this.wlServ.getWorkLeaves(),
    });
  }

  deleteWLData(wl: WorkLeave) {
    this.wlServ.delete(wl.id).subscribe({
      next: () => this.wlServ.getWorkLeaves(),
    });
  }
}
