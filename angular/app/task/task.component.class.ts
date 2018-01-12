import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface TaskInterface {
    id: number;
    name: string;
    scheduleId: number;
    status: string;
    start: Date;
    end: Date;
}

export class TaskCollection {
    dataChange: BehaviorSubject<TaskInterface[]> = new BehaviorSubject<TaskInterface[]>([]);
    get data(): TaskInterface[] { return this.dataChange.value; }

    //copy the data to the observable for rendering
    constructor(data: TaskInterface[] | null) {
        if (data !== null) {
            data.forEach(record => {
                const copiedData = this.data.slice();
                copiedData.push(record);
                this.dataChange.next(copiedData);
            });
        }
    }
}
