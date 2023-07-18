import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerPopupComponent } from './timer-popup.component';

describe('TimerPopupComponent', () => {
  let component: TimerPopupComponent;
  let fixture: ComponentFixture<TimerPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerPopupComponent]
    });
    fixture = TestBed.createComponent(TimerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
