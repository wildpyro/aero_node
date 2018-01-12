import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { TaskInterface, TaskCollection } from './task.component.class';

/**
 * Renders and listens to a table
 */
export class TaskDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }
    get data(): TaskCollection { return this._data; }

    private pristine: TaskCollection;

    constructor(private _data: TaskCollection) {
        super();
        this.pristine = _data;
    }

    connect(): Observable<TaskInterface[]> {
        const displayDataChanges = [
            this._data.dataChange,
            this._filterChange
        ];

        //Monitor the data table for changes
        return Observable.merge(...displayDataChanges).map(() => {
            return this._data.data.slice().filter((item: TaskInterface) => {
                let searchStr = (item.name).toLowerCase();

                if (item.status) {
                    searchStr = (item.status).toLowerCase();
                }

                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    reset(): void {
        //console.log(this._data.data);
        //console.log(this.pristine.data);
    }

    disconnect() { return; }
}
