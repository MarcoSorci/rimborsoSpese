import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day';

@Component({
  selector: 'app-calendar-new',
  templateUrl: './calendar-new.component.html',
  styleUrls: ['./calendar-new.component.scss']
})
export class CalendarNewComponent implements OnInit {

  monthDays: Day[] = [];
  monthIndex = 0;
  year = 0;
  date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  getMonthName(monthIndex: number): string {
    switch (monthIndex) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';

      default:
        return '';
    }
  }

  getWeekDayName(weekDay: number): string {
    switch (weekDay) {
      case 0:
        return 'Mo';
      case 1:
        return 'Tu';
      case 2:
        return 'We';
      case 3:
        return 'Th';
      case 4:
        return 'Fr';
      case 5:
        return 'Sa';
      case 6:
        return 'Su';
      default:
        return '';
    }
  }

}
