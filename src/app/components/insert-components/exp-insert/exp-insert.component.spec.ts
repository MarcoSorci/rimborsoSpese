import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpInsertComponent } from './exp-insert.component';

describe('ExpInsertComponent', () => {
  let component: ExpInsertComponent;
  let fixture: ComponentFixture<ExpInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
