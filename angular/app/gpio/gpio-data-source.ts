import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { GpioInterface, GpioCollection } from './gpio.component.class';

import 'rxjs/add/observable/of';

/**
 * Renders and listens to a table
 */
export class GpioDataSource extends DataSource<any> {

    constructor(private _data: GpioCollection) {
        super();
    }

    connect(): Observable<GpioInterface[]> {
        return this._data.dataChange;
    }

    disconnect() { return; }
}
