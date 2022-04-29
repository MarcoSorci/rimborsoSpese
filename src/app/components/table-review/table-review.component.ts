import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Expense } from 'src/app/models/expense';
import { DialogService } from 'src/app/services/dialog.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table-review',
  templateUrl: './table-review.component.html',
  styleUrls: ['./table-review.component.scss'],
})
export class TableReviewComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public serv: ExpenseService,
    public userServ: UserService,
    public dialogServ: DialogService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'date',
    'type',
    'amount',
    'hasReceipt',
    'notes',
  ];

  matDataSource = new MatTableDataSource<Expense>(this.serv.expenseList.value);
  dataSource = this.serv.expenseList;
  clickedRows = this.serv.clickedRows;

  ngOnInit(): void {
    this.serv.getExpenses();
    this.matDataSource.sort = this.sort;
    if (this.userServ.user?.type === 'admin') {
      this.displayedColumns.unshift('userName');
      this.displayedColumns.push('actions');
    }
  }

  openValidationPanel(exp: Expense) {
    console.log(exp);
    this.clickedRows.clear();
    this.clickedRows.add(exp);
  }

}
