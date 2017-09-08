import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpioComponent } from './gpio.component';

describe('GpioComponent', () => {
  let component: GpioComponent;
  let fixture: ComponentFixture<GpioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
