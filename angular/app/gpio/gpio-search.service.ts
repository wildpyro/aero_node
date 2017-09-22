import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { GpioInterface } from './gpio.component.class';

@Injectable()
export class GpioSearchService {

  constructor(private http: HttpClient) { }

  search(term: string): Observable<GpioInterface[]> {
    return this.http
      .get(`gpio/?scheduleName=${term}`)
      .map(response => response as GpioInterface[]);
  }
}
