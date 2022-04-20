import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table-review',
  templateUrl: './table-review.component.html',
  styleUrls: ['./table-review.component.scss'],
})
export class TableReviewComponent implements OnInit {
  constructor(public serv: ExpenseService, public userServ: UserService) {}

  ngOnInit(): void {
    this.serv.getExpenses();
    //this.userServ.userId = ;
  }

  

  displayedColumns: string[] = [
    'date',
    'type',
    'amount',
    'hasReceipt',
    'notes',
    'actions',
  ];

  //dataSource = new MatTableDataSource<Expense>(this.serv.expenseList$.value);
  dataSource = this.serv.expenseList$;
  clickedRows = new Set<Expense>();

  // @ViewChild(MatSort) sort!: MatSort;

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }

  validate(exp: Expense) {
    console.log(exp);

    this.serv.validate(exp);
    const res = document.getElementById('validation-result');
    res?.setAttribute(
      'id',
      'validation-result' + Math.random().toString(16).slice(2)
    );
  }

  delete(exp: Expense) {
    console.log(exp);

    this.serv
      .delete(exp.id)
      .subscribe({
        next: () => this.serv.getExpenses(),
        complete: () => this.clickedRows.clear(),
      });
  }
}
