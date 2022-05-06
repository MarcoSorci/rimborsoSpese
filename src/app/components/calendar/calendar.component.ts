import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Day } from 'src/app/models/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  monthDays: Day[] = [];
  date = new Date();
  weekDaysName: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  activeYear = this.date.getFullYear();
  activeMonth = this.date.getMonth();
  firstDay!: Day;

  rangeSelection!: boolean;
  startingDay?: Day;
  endingDay?: Day;
  rangeArray: Day[] = [];
  @Input() isRangeSelector!: boolean;

  @Output() dateSelected = new EventEmitter<Day>();
  @Output() rangeSelected = new EventEmitter<Day[]>();

  constructor() {}

  ngOnInit(): void {
    this.monthDays = this.getMonthDays(this.activeMonth, this.activeYear);
  }

  createDay(dayNumber: number, monthIndex: number, year: number): Day {
    let newDay = new Day();
    newDay.number = dayNumber;
    newDay.monthIndex = monthIndex;
    newDay.month = this.getMonthName(monthIndex);
    newDay.year = this.activeYear;
    newDay.weekDayIndex = new Date(year, monthIndex, dayNumber - 1).getDay();
    newDay.weekDayName = this.getWeekDayName(newDay.weekDayIndex);
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
  getCurrentDays(
    daysArray: Day[],
    monthIndex: number,
    year: number,
    dayCount: number
  ) {
    for (let i = 1; i < dayCount + 1; i++) {
      daysArray.push(this.createDay(i, monthIndex, year));
    }
  }
  getFollowingDays(
    daysArray: Day[],
    monthIndex: number,
    year: number,
    dayCount: number
  ) {
    let lastDay = this.createDay(dayCount, monthIndex, year);
    for (let i = lastDay.weekDayIndex; i < 6; i++) {
      daysArray.push(
        this.createDay(this.firstDay.number, monthIndex + 1, year)
      );
      this.firstDay.number++;
    }
  }

  onNextMonth(): void {
    this.activeMonth++;
    if (this.activeMonth === 12) {
      this.activeYear++;
      this.activeMonth = 0;
    }
    this.monthDays = this.getMonthDays(this.activeMonth, this.activeYear);
  }

  onPreviousMonth(): void {
    this.activeMonth--;
    if (this.activeMonth < 0) {
      this.activeYear--;
      this.activeMonth = 11;
    }
    this.monthDays = this.getMonthDays(this.activeMonth, this.activeYear);
  }

  onDaySelected(day: Day) {
    this.dateSelected.emit(day);
    console.log(day);
  }

  onRangeSelect(day: Day) {
    if (!this.rangeSelection) {
      this.startingDay = day;
      this.rangeSelection = true;
      console.log('starting day', this.startingDay);
    } else {
      this.endingDay = day;
      this.rangeSelection = false;
      console.log('ending day', this.endingDay);
    }
    this.createRange();
  }

  createRange(){
    if (this.startingDay && this.endingDay) {
      if (this.startingDay.number < this.endingDay.number) {
        this.rangeArray.push(this.startingDay);
        const newDay = this.startingDay;
        for (let i = newDay.number; i < this.endingDay.number; i++) {
          newDay.number = i + 1;
          this.rangeArray.push(newDay);
        }
        this.rangeArray.push(this.endingDay);
        console.log('range array', this.rangeArray);
        this.rangeSelected.emit(this.rangeArray);
      } 
      else {
        console.log('error, choose another range');
        this.startingDay = undefined;
        this.endingDay = undefined;
      }
    }
  }

  getMonthName(monthIndex: number): string {
    switch (monthIndex) {
      case 0:
        return 'Jan';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Apr';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Aug';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dec';

      default:
        return '';
    }
  }

  getWeekDayName(weekDay: number): string {
    switch (weekDay) {
      case 0:
        return 'Mon';
      case 1:
        return 'Tue';
      case 2:
        return 'Wed';
      case 3:
        return 'Thu';
      case 4:
        return 'Fri';
      case 5:
        return 'Sat';
      case 6:
        return 'Sun';
      default:
        return '';
    }
  }
}
