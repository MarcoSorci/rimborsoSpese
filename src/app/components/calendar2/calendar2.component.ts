import { Component, OnInit } from '@angular/core';
import { Day } from 'src/app/models/day';
import { SelectOptions } from 'src/app/models/select-options';

@Component({
  selector: 'app-calendar2',
  templateUrl: './calendar2.component.html',
  styleUrls: ['./calendar2.component.scss'],
})
export class Calendar2Component implements OnInit {

  weekDays: SelectOptions[] = [
    { viewValue: 'Mon', value: 0 },
    { viewValue: 'Tue', value: 1 },
    { viewValue: 'Wed', value: 2 },
    { viewValue: 'Thu', value: 3 },
    { viewValue: 'Fri', value: 4 },
    { viewValue: 'Sat', value: 5 },
    { viewValue: 'Sun', value: 6 },
  ];

  months: SelectOptions[] = [
    { viewValue: 'January', value: 0 },
    { viewValue: 'February', value: 1 },
    { viewValue: 'March', value: 2 },
    { viewValue: 'April', value: 3 },
    { viewValue: 'May', value: 4 },
    { viewValue: 'June', value: 5 },
    { viewValue: 'July', value: 6 },
    { viewValue: 'August', value: 7 },
    { viewValue: 'September', value: 8 },
    { viewValue: 'October', value: 9 },
    { viewValue: 'November', value: 10 },
    { viewValue: 'December', value: 11 },
  ];

  monthDays: Day[] = [];
  monthNumber = 0;
  year = 0;
  date = new Date();

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
    for (const month of this.months) {
      if (month.value === monthIndex) {
        day.month = month.viewValue;
        break;
      }
    }

    day.number = dayNumber;
    day.year = year;

    day.weekDayIndex = new Date(year, monthIndex, dayNumber).getDay();
    for (const dayName of this.weekDays) {
      if (dayName.value === day.weekDayIndex) {
        day.weekDayName = dayName.viewValue;
        break;
      }
    }
    return day;
  }

  dayClicked(day: Day) {
    console.log(day);
  }
}
