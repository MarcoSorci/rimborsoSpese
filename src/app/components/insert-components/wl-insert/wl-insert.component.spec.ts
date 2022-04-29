import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WlInsertComponent } from './wl-insert.component';

describe('WlInsertComponent', () => {
  let component: WlInsertComponent;
  let fixture: ComponentFixture<WlInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WlInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WlInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
