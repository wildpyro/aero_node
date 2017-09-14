import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Gpio } from './gpio.component.class';

@Injectable()
export class GpioService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private gpiosUrl = 'gpio';

    constructor(private http: Http) { }

    getGpios(): Promise<Gpio[]> {
        return this.http.get(this.gpiosUrl)
            .toPromise()
            .then(response => response.json().data as Gpio[])
            .catch(this.handleError);
    }


    getGpio(id: number): Promise<Gpio> {
        const url = `${this.gpiosUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Gpio)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.gpiosUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<Gpio> {
        return this.http
            .post(this.gpiosUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Gpio)
            .catch(this.handleError);
    }

    update(hero: Gpio): Promise<Gpio> {
        const url = `${this.gpiosUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
