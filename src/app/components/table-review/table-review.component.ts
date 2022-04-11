import { Component, OnInit } from '@angular/core';

export interface Expense {
  date: string;
  type: string;
  amount: number;
  hasReceipt: boolean;
}

const EXPENSE_DATA: Expense[] = [
  { date: '01/2022', type: 'Taxi', amount: 10, hasReceipt: true },
  { date: '02/2022', type: 'Taxi', amount: 30, hasReceipt: false },
];

@Component({
  selector: 'app-table-review',
  templateUrl: './table-review.component.html',
  styleUrls: ['./table-review.component.scss'],
})
export class TableReviewComponent {
  displayedColumns: string[] = ['date', 'type', 'amount', 'hasReceipt'];
  dataSource = EXPENSE_DATA;
}
