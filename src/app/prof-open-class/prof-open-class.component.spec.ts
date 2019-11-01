import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfOpenClassComponent } from './prof-open-class.component';

describe('ProfOpenClassComponent', () => {
  let component: ProfOpenClassComponent;
  let fixture: ComponentFixture<ProfOpenClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfOpenClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfOpenClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
