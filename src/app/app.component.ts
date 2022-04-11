import { Component } from '@angular/core';
import { InsertService } from './services/insert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public serv: InsertService) {}
  title = 'Rimborso Spese';
}
