import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpioSearchComponent } from './gpio-search.component';

describe('GpioSearchComponent', () => {
  let component: GpioSearchComponent;
  let fixture: ComponentFixture<GpioSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpioSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpioSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
