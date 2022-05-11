import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Day } from 'src/app/models/day';
import { SelectOptions } from 'src/app/models/select-options';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent {

  activeYear = this.serv.activeYear;

 monthsList: SelectOptions[] = [
    { value: 0, viewValue: 'JAN' },
    { value: 1, viewValue: 'FEB' },
    { value: 2, viewValue: 'MAR' },
    { value: 3, viewValue: 'APR' },
    { value: 4, viewValue: 'MAY' },
    { value: 5, viewValue: 'JUN' },
    { value: 6, viewValue: 'JUL' },
    { value: 7, viewValue: 'AUG' },
    { value: 8, viewValue: 'SEP' },
    { value: 9, viewValue: 'OCT' },
    { value: 10, viewValue: 'NOV' },
    { value: 11, viewValue: 'DEC' }
  ]

  @Output() dateSelected = new EventEmitter<Day>();

  constructor(public serv: CalendarService) {}

  onNextYear(): void {
      this.activeYear++;
      
  }
  onPreviousYear(): void {
      this.activeYear--;
  }

  onMonthSelected(monthIndex: number) {
const dayForMonthSelection = this.serv.createDay(1, monthIndex, this.activeYear);
    this.dateSelected.emit(dayForMonthSelection);
    console.log(dayForMonthSelection);
    
  }
}
