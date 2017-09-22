import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ScheduleInterface {
    id: number;
    name: string;
    description: string;
    interval: number;
    interval_unit: string;
    duration: number;
    duration_unit: string;
    gpio_pin: number;
}

export class ScheduleCollection {
    dataChange: BehaviorSubject<ScheduleInterface[]> = new BehaviorSubject<ScheduleInterface[]>([]);
    get data(): ScheduleInterface[] { return this.dataChange.value; }

    //copy the data to the observable for rendering
    constructor(data: ScheduleInterface[] | null) {
        if (data !== null) {
            data.forEach(record => {
                const copiedData = this.data.slice();
                copiedData.push(record);
                this.dataChange.next(copiedData);
            });
        }
    }
}
