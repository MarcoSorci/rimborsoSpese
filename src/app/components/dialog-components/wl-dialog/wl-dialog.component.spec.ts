import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WlDialogComponent } from './wl-dialog.component';

describe('WlDialogComponent', () => {
  let component: WlDialogComponent;
  let fixture: ComponentFixture<WlDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WlDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
