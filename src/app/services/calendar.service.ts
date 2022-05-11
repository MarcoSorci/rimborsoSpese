import { Injectable } from '@angular/core';
import { Day } from '../models/day';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  date = new Date();

  activeYear = this.date.getFullYear();
  activeMonth = this.date.getMonth();
  firstDay!: Day;

  constructor() { }

  createDay(dayNumber: number, monthIndex: number, year: number): Day {
    let newDay = new Day();
    newDay.number = dayNumber;
    newDay.monthIndex = monthIndex;
    newDay.month = Day.getMonthName(monthIndex);
    newDay.year = year
    newDay.weekDayIndex = new Date(year, monthIndex, dayNumber - 1).getDay();
    newDay.weekDayName = Day.getWeekDayName(newDay.weekDayIndex);
    newDay.dayId = newDay.number + newDay.monthIndex + newDay.year;
    if (
      this.date.getDate() === dayNumber &&
      this.date.getMonth() === monthIndex &&
      this.date.getFullYear() === year
    ) {
      newDay.isToday = true;
    }
    return newDay;
  }

  getMonthDays(monthIndex: number, year: number): Day[] {
    let days: Day[] = [];
    this.firstDay = this.createDay(1, monthIndex, year);
    let dayCount = new Date(year, monthIndex + 1, 0).getDate();

    this.getPreviousDays(days, monthIndex - 1, year);
    this.getCurrentDays(days, monthIndex, year, dayCount);
    this.getFollowingDays(days, monthIndex, year, dayCount);

    return days;
  }
  
  getPreviousDays(daysArray: Day[], monthIndex: number, year: number) {
    let countDaysInPrevMonth = new Date(year, monthIndex, 0).getDate();
    let lastPrevDay = this.createDay(countDaysInPrevMonth, monthIndex, year);
    for (let i = 1; i < this.firstDay.weekDayIndex + 1; i++) {
      daysArray.unshift(this.createDay(lastPrevDay.number, monthIndex, year));
      lastPrevDay.number--;
    }
  }

  getCurrentDays(daysArray: Day[], monthIndex: number, year: number, dayCount: number) {
    for (let i = 1; i < dayCount + 1; i++) {
      daysArray.push(this.createDay(i, monthIndex, year));
    }
  }

  getFollowingDays(daysArray: Day[], monthIndex: number, year: number, dayCount: number) {
    let lastDay = this.createDay(dayCount, monthIndex, year);
    for (let i = lastDay.weekDayIndex; i < 6; i++) {
      daysArray.push(
        this.createDay(this.firstDay.number, monthIndex + 1, year)
      );
      this.firstDay.number++;
    }
  }


}
