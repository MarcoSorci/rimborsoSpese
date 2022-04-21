import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-table-review',
  templateUrl: './table-review.component.html',
  styleUrls: ['./table-review.component.scss'],
})
export class TableReviewComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> | undefined;

  constructor(
    public dialog: MatDialog,
    public serv: ExpenseService,
    public userServ: UserService
  ) {}

@ViewChild(MatSort) sort!: MatSort;

displayedColumns: string[] = [
  'date',
  'type',
  'amount',
  'hasReceipt',
  'notes',
];

  ngOnInit(): void {
    this.serv.getExpenses();
    this.matDataSource.sort = this.sort;
    if (this.userServ.user?.type === 'admin') {
      this.displayedColumns.unshift('userName');
      this.displayedColumns.push('actions');
    }
  }


  matDataSource = new MatTableDataSource<Expense>(this.serv.expenseList.value);
  dataSource = this.serv.expenseList;
  clickedRows = new Set<Expense>();

  openDialog(action: any, obj: { action: any; }) {
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

  validate(exp: Expense) {
    console.log(exp);

    this.clickedRows.clear();
    this.serv.validate(exp);
    const res = document.getElementById('validation-result');
    res?.setAttribute(
      'id',
      'validation-result' + Math.random().toString(16).slice(2)
    );
  }

  deleteRowData(exp: Expense) {
    console.log(exp);

    this.serv.delete(exp.id).subscribe({
      next: () => this.serv.getExpenses(),
      complete: () => this.clickedRows.clear(),
    });
  }


}
