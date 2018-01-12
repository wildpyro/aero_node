import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { TaskInterface } from './task.component.class';

@Injectable()
export class TaskService {

    private tasksUrl = 'task';

    constructor(private http: HttpClient) { }

    getTasks(): Promise<TaskInterface[]> {
        /*return this.http.get(this.tasksUrl)
            .toPromise()
            .then() //do something with it if we want
            .catch(this.handleError);*/

        let fakeData: TaskInterface[] = [
            { id: 1, name: 'bendz', scheduleId: 1, status: 'active', start: null, end: new Date() },
            { id: 2, name: 'bendz2', scheduleId: 11, status: 'active', start: new Date(), end: new Date() },
            { id: 3, name: 'test', scheduleId: 5, status: 'active', start: new Date(), end: new Date() },
            { id: 4, name: 'case', scheduleId: 12, status: 'active', start: new Date(), end: new Date() },
            { id: 4, name: 'case', scheduleId: 12, status: 'active', start: new Date(), end: new Date() },
            { id: 4, name: 'case', scheduleId: 12, status: 'active', start: new Date(), end: new Date() },
            { id: 4, name: 'case', scheduleId: 12, status: 'active', start: new Date(), end: new Date() },
            { id: 4, name: 'case', scheduleId: 12, status: 'active', start: new Date(), end: new Date() },
            { id: 4, name: 'case', scheduleId: 12, status: 'active', start: new Date(), end: new Date() },
        ];

        //console.log(fakeData);

        return new Promise(function (resolve: any, reject: any) { resolve(fakeData); });
    }

    getTask(id: number): Promise<TaskInterface> {
        const url = `${this.tasksUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.tasksUrl}/${id}`;
        return this.http.delete(url)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(name: string): Promise<TaskInterface> {
        return this.http
            .post(this.tasksUrl, JSON.stringify({ name: name }))
            .toPromise()
            .then(response => response as TaskInterface)
            .catch(this.handleError);
    }

    update(task: TaskInterface): Promise<TaskInterface> {
        const url = `${this.tasksUrl}/${task.id}`;
        return this.http
            .put(url, JSON.stringify(task))
            .toPromise()
            .then(() => task)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
