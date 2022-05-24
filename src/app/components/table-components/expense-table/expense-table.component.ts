import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Expense } from 'src/app/models/expense';
import { DialogService } from 'src/app/services/dialog.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss'],
})
export class ExpenseTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'date',
    'type',
    'amount',
    'hasReceipt',
    'notes',
  ];

  dataSource = this.serv.expenseList;
  clickedRows = this.serv.clickedRows;
  validationResVisible = false;

  constructor(
    public dialog: MatDialog,
    public serv: ExpenseService,
    public userServ: UserService,
    public dialogServ: DialogService,
    public valServ: ValidationService
  ) {}

  ngOnInit(): void {
    this.serv.getExpenses();
    if (this.userServ.user?.type === 'admin') {
      this.displayedColumns.unshift('userName');
      this.displayedColumns.push('actions');
    }
  }

  ngAfterViewInit() {
    this.clickedRows.clear();
  }

  checkValidation(exp: Expense) {
    if (!exp.isManuallyValidated) {
      this.valServ.autoValidate(exp);
    }
    this.validationResVisible = true;
  }

  sortData(sort: Sort) {
    const data = this.dataSource.value.slice();
    data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date':
          return this.compare(a.date, b.date, isAsc);
        case 'type':
          return this.compare(a.type, b.type, isAsc);
        case 'amount':
          return this.compare(a.amount, b.amount, isAsc);
        case 'hasReceipt':
          return this.compare(a.hasReceipt, b.hasReceipt, isAsc);
        case 'userName':
          return this.compare(a.userName, b.userName, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.next(data);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openValidationPanel(exp: Expense) {
    console.log(exp);
    this.clickedRows.clear();
    this.clickedRows.add(exp);
  }
}
