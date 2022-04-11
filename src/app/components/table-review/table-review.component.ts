import { Component, OnInit } from '@angular/core';
import { InsertService } from 'src/app/services/insert.service';

@Component({
  selector: 'app-table-review',
  templateUrl: './table-review.component.html',
  styleUrls: ['./table-review.component.scss'],
})
export class TableReviewComponent {
  constructor(private serv: InsertService) {}
  displayedColumns: string[] = [
    'date',
    'type',
    'amount',
    'hasReceipt',
    'notes',
  ];
  dataSource = this.serv.EXPENSE_DATA;
}
