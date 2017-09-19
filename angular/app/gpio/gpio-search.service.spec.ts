import { TestBed, inject } from '@angular/core/testing';

import { GpioSearchService } from './gpio-search.service';

describe('GpioSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GpioSearchService]
    });
  });

  it('should be created', inject([GpioSearchService], (service: GpioSearchService) => {
    expect(service).toBeTruthy();
  }));
});
