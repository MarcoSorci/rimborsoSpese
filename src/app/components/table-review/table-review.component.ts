import { Component } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { InsertService } from 'src/app/services/insert.service';

@Component({
  selector: 'app-table-review',
  templateUrl: './table-review.component.html',
  styleUrls: ['./table-review.component.scss'],
})
export class TableReviewComponent {
  
  constructor(public serv: InsertService) {}

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
  }
}
