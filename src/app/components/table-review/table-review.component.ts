import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-table-review',
  templateUrl: './table-review.component.html',
  styleUrls: ['./table-review.component.scss'],
})
export class TableReviewComponent implements OnInit {

  expenseList: Expense[] = [];

  
  constructor(public serv: ExpenseService) {}

  ngOnInit(): void {
    this.serv.getExpenses();
  }

  displayedColumns: string[] = [
    'date',
    'type',
    'amount',
    'hasReceipt',
    'notes'
  ];

  dataSource = this.serv.expenseList;
  clickedRows = new Set<Expense>();

  validate(exp:Expense){
    this.serv.validate(exp);
    const res = document.getElementById('validation-result')
    res?.setAttribute('id', 'validation-result'+ Math.random().toString(16).slice(2));
  }



  
}
