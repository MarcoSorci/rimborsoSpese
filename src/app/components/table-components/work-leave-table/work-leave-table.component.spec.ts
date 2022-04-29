import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLeaveTableComponent } from './work-leave-table.component';

describe('WorkLeaveTableComponent', () => {
  let component: WorkLeaveTableComponent;
  let fixture: ComponentFixture<WorkLeaveTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkLeaveTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLeaveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
