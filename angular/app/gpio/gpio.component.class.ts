import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface GpioInterface {
    id: number;
    pin: number;
    scheduleName: string;
}

export class GpioCollection {
    dataChange: BehaviorSubject<GpioInterface[]> = new BehaviorSubject<GpioInterface[]>([]);
    size: number;
    get data(): GpioInterface[] { return this.dataChange.value; }

    //copy the data to the observable for rendering
    constructor(data: GpioInterface[] | null) {
        if (data !== null) {
            data.forEach(record => {
                const copiedData = this.data.slice();
                copiedData.push(record);
                this.dataChange.next(copiedData);
                this.size++;
            });
        }
    }
}
