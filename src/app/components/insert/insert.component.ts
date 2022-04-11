import { Component, OnInit } from '@angular/core';
import { MatDateFormats, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';


export const GRI_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'short',
    } as Intl.DateTimeFormatOptions,
  }
};

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS }],
})
export class InsertComponent {
  constructor(private router: Router) {}

  insert() {
    this.router.navigate(['table']);
  }
}

