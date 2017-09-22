import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';

import { GpioInterface, GpioCollection } from './gpio.component.class';


/**
 * Renders and listens to a table
 */
export class GpioDataSource extends DataSource<any> {

    _filterChange = new BehaviorSubject('');
    //_paginator: new MdPaginator();
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }
    get data(): GpioCollection { return this._data; }
    get dataLength(): number { return this._data.size; }

    constructor(private _data: GpioCollection) {
        super();
    }

    connect(): Observable<GpioInterface[]> {
        const displayDataChanges = [
            this._data.dataChange,
            this._filterChange
            //,this._paginator.page,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this._data.data.slice().filter((item: GpioInterface) => {
                let searchStr = (item.scheduleName).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    disconnect() { return; }
}
