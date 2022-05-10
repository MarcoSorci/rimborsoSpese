import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Day } from 'src/app/models/day';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  monthDays: Day[] = [];

  activeMonth = this.serv.activeMonth;
  activeYear = this.serv.activeYear;

  weekDaysName: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  rangeSelection!: boolean;
  startingDay?: Day;
  endingDay?: Day;
  rangeArray: Day[] = [];
  @Input() isRangeSelector!: boolean;

  @Output() dateSelected = new EventEmitter<Day>();
  @Output() rangeSelected = new EventEmitter<Day[]>();

  constructor(public serv: CalendarService) {}

  ngOnInit(): void {
    this.monthDays = this.serv.getMonthDays(this.activeMonth, this.activeYear);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.onNextMonth();
      }
      if (e.key === 'ArrowLeft') {
        this.onPreviousMonth();
      }
      if (e.key === 'ArrowUp') {
        this.activeYear++;
        this.monthDays = this.serv.getMonthDays(
          this.activeMonth,
          this.activeYear
        );
      }
      if (e.key === 'ArrowDown') {
        this.activeYear--;
        this.monthDays = this.serv.getMonthDays(
          this.activeMonth,
          this.activeYear
        );
      }
    });
  }

  onNextMonth(): void {
    this.activeMonth++;
    if (this.activeMonth === 12) {
      this.activeYear++;
      this.activeMonth = 0;
    }
    this.monthDays = this.serv.getMonthDays(this.activeMonth, this.activeYear);
  }

  onPreviousMonth(): void {
    this.activeMonth--;
    if (this.activeMonth < 0) {
      this.activeYear--;
      this.activeMonth = 11;
    }
    this.monthDays = this.serv.getMonthDays(this.activeMonth, this.activeYear);
  }

  onDaySelected(day: Day) {
    this.dateSelected.emit(day);
    console.log(day);
  }

  onRangeSelect(day: Day) {
    day.isSelected = true;
    if (this.startingDay && this.endingDay) {
      this.startingDay.isSelected = false;
      this.endingDay.isSelected = false;
      this.startingDay = undefined;
      this.endingDay = undefined;
      this.rangeArray.forEach((e) => this.checkIfSelected(e, true));
      this.rangeArray = [];
    }
    !this.rangeSelection
      ? ((this.startingDay = day), (this.rangeSelection = true))
      : ((this.endingDay = day), (this.rangeSelection = false));

    this.createRange();
  }

  createRange() {
    if (this.startingDay && this.endingDay) {
      if (this.startingDay.number < this.endingDay.number) {
        for (let i = this.startingDay.number; i < this.endingDay.number; i++) {
          const newDay = this.serv.createDay(
            i,
            this.startingDay.monthIndex,
            this.startingDay.year
          );
          this.checkIfSelected(newDay);
          this.rangeArray.push(newDay);
        }
        this.rangeArray.push(this.endingDay);
        console.log('range array', this.rangeArray);
        this.rangeSelected.emit(this.rangeArray);
      } else {
        console.log('error, choose another range');
        this.startingDay = undefined;
        this.endingDay = undefined;
        this.rangeArray = [];
      }
    }
  }

  checkIfSelected(dayToCheck: Day, deselect = false) {
    for (const day of this.monthDays) {
      if (day.dayId === dayToCheck.dayId) {
        deselect ? (day.isSelected = false) : (day.isSelected = true);
      }
    }
  }
}
