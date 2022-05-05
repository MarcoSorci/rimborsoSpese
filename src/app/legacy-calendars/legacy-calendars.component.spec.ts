import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyCalendarsComponent } from './legacy-calendars.component';

describe('LegacyCalendarsComponent', () => {
  let component: LegacyCalendarsComponent;
  let fixture: ComponentFixture<LegacyCalendarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegacyCalendarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegacyCalendarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
