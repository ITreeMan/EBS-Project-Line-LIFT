import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeALeaveComponent } from './take-aleave.component';

describe('TakeALeaveComponent', () => {
  let component: TakeALeaveComponent;
  let fixture: ComponentFixture<TakeALeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeALeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeALeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
