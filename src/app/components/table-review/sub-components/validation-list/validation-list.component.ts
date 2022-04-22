import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';
import { ValidationDialogComponent } from './validation-dialog/validation-dialog.component';

@Component({
  selector: 'app-validation-list',
  templateUrl: './validation-list.component.html',
  styleUrls: ['./validation-list.component.scss'],
})
export class ValidationListComponent implements AfterViewInit {
  constructor(
    public dialog: MatDialog,
    public serv: ExpenseService,
    public userServ: UserService
  ) {}

  clickedRows = this.serv.clickedRows;

  ngAfterViewInit() {
    this.clickedRows.clear();
  }

  checkValidation(exp: Expense) {
    if (!exp.isManuallyValidated) {
      this.serv.autoValidate(exp);
    }
    const res = document.getElementById('validation-result');
    if (res) {
      res.setAttribute(
        'id',
        'validation-result' + Math.random().toString(16).slice(2)
      );
      res.style.display = 'flex';
    }
  }

  openDialog(exp: Expense) {
    this.clickedRows.clear();
    const dialogRef = this.dialog.open(ValidationDialogComponent, {
      width: '250px',
      data: exp,
    });

    dialogRef
      .afterClosed()
      .subscribe((result) => this.updateRowData(result.data));
  }

  updateRowData(exp: Expense) {
    this.serv.update(exp).subscribe({
      next: () => this.serv.getExpenses(),
      complete: () => this.clickedRows.clear(),
    });
  }
}
