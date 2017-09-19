import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Gpio } from './gpio.component.class';

@Injectable()
export class GpioSearchService {

  constructor(private http: Http) { }

  search(term: string): Observable<Gpio[]> {
    return this.http
      .get(`api/heroes/?name=${term}`)
      .map(response => response.json().data as Gpio[]);
  }
}
