import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ScheduleInterface, ScheduleCollection } from './schedule.class';

import 'rxjs/add/observable/of';

/**
 * Renders and listens to a table
 */
export class ScheduleDataSource extends DataSource<any> {

    constructor(private _data: ScheduleCollection) {
        super();
    }

    connect(): Observable<ScheduleInterface[]> {
        return this._data.dataChange;
    }

    disconnect() { return; }
}
