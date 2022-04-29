import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../components/dialog-box/dialog-box.component';
import { Expense } from '../models/expense';
import { ExpenseService } from './expense.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog,
    public serv: ExpenseService,
  ) { }

  clickedRows = this.serv.clickedRows;

  openDialog(action: any, obj: any) {
    this.clickedRows.clear();
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  updateRowData(exp: Expense) {
    this.serv.update(exp).subscribe({
      next: () => this.serv.getExpenses(),
      complete: () => this.clickedRows.clear(),
    });
  }

  deleteRowData(exp: Expense) {
    this.serv.delete(exp.id).subscribe({
      next: () => this.serv.getExpenses(),
      complete: () => this.clickedRows.clear(),
    });
  }

}
