import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { InsertService } from 'src/app/services/insert.service';

@Component({
  selector: 'app-table-review',
  templateUrl: './table-review.component.html',
  styleUrls: ['./table-review.component.scss'],
})
export class TableReviewComponent implements OnInit {

  expenseList: Expense[] = [];
  
  constructor(public serv: InsertService) {}

  ngOnInit(): void {
    this.serv
  }

  displayedColumns: string[] = [
    'date',
    'type',
    'amount',
    'hasReceipt',
    'notes'
  ];
  dataSource = this.serv.EXPENSE_DATA;
  clickedRows = new Set<Expense>();

  validate(exp:Expense){
    this.serv.validate(exp);
    const res = document.getElementById('validation-result')
    if (res) {
      res.style.display = 'block';
    }
    
  }
}
