import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { GpioInterface } from './gpio.component.class';

@Injectable()
export class GpioService {

    private gpiosUrl = 'gpio';

    constructor(private http: HttpClient) { }

    getGpios(): Promise<GpioInterface[]> {
        return this.http.get(this.gpiosUrl)
            .toPromise()
            .then() //do something with it if we want
            .catch(this.handleError);

        /*let fakeData: GpioInterface[] = [
            { id: 1, pin: 1, scheduleName: 'test' }
        ];

        return new Promise(function (resolve: any, reject: any) { resolve(fakeData); });*/
    }

    getGpio(id: number): Promise<GpioInterface> {
        const url = `${this.gpiosUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.gpiosUrl}/${id}`;
        return this.http.delete(url)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<GpioInterface> {
        return this.http
            .post(this.gpiosUrl, JSON.stringify({ name: name }))
            .toPromise()
            .then(response => response as GpioInterface)
            .catch(this.handleError);
    }

    update(gpio: GpioInterface): Promise<GpioInterface> {
        const url = `${this.gpiosUrl}/${gpio.id}`;
        return this.http
            .put(url, JSON.stringify(gpio))
            .toPromise()
            .then(() => gpio)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
