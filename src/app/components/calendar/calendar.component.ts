import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  monthDays: Day[] = [];
  monthNumber = 0;
  year = 0;
  date = new Date();

  weekDaysName :string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];


  constructor() {}
  
  ngOnInit(): void {
    this.setMonthDays(this.getCurrentMonth());
  }

  setMonthDays(days: Day[]): void {
    this.monthDays = days;
    this.monthNumber = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }
  
  getCurrentMonth(): Day[] {
    return this.getMonth(this.date.getMonth(), this.date.getFullYear());
  }
  
  getMonth(monthIndex: number, year: number): Day[] {
    let days = [];

    let firstday = this.createDay(1, monthIndex, year);

    for (let i = 1; i < firstday.weekDayIndex; i++) {
      days.push({
        weekDayIndex: i,
        monthIndex: monthIndex,
        year: year,
      } as Day);
    }
    days.push(firstday);

    let countDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    for (let i = 2; i < countDaysInMonth + 1; i++) {
      days.push(this.createDay(i, monthIndex, year));
    }

    return days;
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
        return 'January';
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

  createDay(dayNumber: number, monthIndex: number, year: number) {
    let day: Day = {
      number: 0,
      year: 0,
      month: '',
      monthIndex: 0,
      weekDayName: '',
      weekDayIndex: 0,
    };

    day.monthIndex = monthIndex;
    day.month = this.getMonthName(monthIndex);

    day.number = dayNumber;
    day.year = year;

    day.weekDayIndex = new Date(year, monthIndex, dayNumber).getDay();
    day.weekDayName = this.getWeekDayName(day.weekDayIndex);

    return day;
  }


  onNextMonth(): void {
    this.monthNumber++;

    if (this.monthNumber === 13) {
      this.year++;
      this.monthNumber = 1;
    }

    this.setMonthDays(this.getMonth(this.monthNumber, this.year));
  }

  onPreviousMonth() : void{
    this.monthNumber--;

    if (this.monthNumber < 1) {
      this.year--;
      this.monthNumber = 12;
    }

    this.setMonthDays(this.getMonth(this.monthNumber, this.year));
  }


  dayClicked(day: Day) {
    console.log(day);
  }
}



