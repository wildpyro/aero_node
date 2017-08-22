import { Transaction, UpdateOptions, DestroyOptions, FindOptions } from 'sequelize';
import { ScheduleAttributes, ScheduleInstance } from '../schemas/ScheduleSchema';
import { database as DatabaseInstance } from '../../core/models/Database';

class ScheduleModel {
    create(scheduleAttributes: ScheduleAttributes): Promise<ScheduleInstance> {
        let promise = new Promise<ScheduleInstance>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.schedule.create(scheduleAttributes)
                    .then((result: ScheduleInstance) => {
                        resolve(result);
                    })
                    .catch((error: Error) => {
                        reject(error);
                    });
            });
        });

        return promise;
    }

    update(id: number, scheduleAttributes: ScheduleAttributes): Promise<number> {

        let options: UpdateOptions;
        options = {
            where: { id: id }
        };

        let promise = new Promise<number>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.schedule.update(scheduleAttributes, options)
                    .then((result: [number, Array<ScheduleInstance>]) => {
                        if (result.length === 0) {
                            reject(new Error('No rows updated'));
                        }
                        else {
                            resolve(result.length);
                        }
                    })
                    .catch((error: Error) => {
                        reject(error);
                    });
            });
        });

        return promise;
    }

    delete(id: number): Promise<number> {

        let options: DestroyOptions;
        options = {
            where: { id: id }
        };

        let promise = new Promise<number>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.schedule.destroy(options)
                    .then((result: number) => {
                        if (result === 0) {
                            reject(new Error('No rows deleted'));
                        }
                        else {
                            resolve(result);
                        }
                    })
                    .catch((error: Error) => {
                        reject(error);
                    });
            });
        });

        return promise;
    }

    findAll(where?: any, orderBy?: any): Promise<Array<ScheduleInstance>> {

        let options: FindOptions;
        options = {
            where: where,
            order: orderBy
        };

        let promise = new Promise<Array<ScheduleInstance>>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.schedule.findAll(options)
                    .then((result: Array<ScheduleInstance>) => {
                        resolve(result);
                    })
                    .catch((error: Error) => {
                        reject(error);
                    });
            });
        });

        return promise;
    }

    findById(id: number): Promise<ScheduleInstance> {

        let options: FindOptions;
        options = {
            where: { id: id }
        };

        let promise = new Promise<ScheduleInstance>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.schedule.find(options)
                    .then((result: ScheduleInstance) => {
                        resolve(result);
                    })
                    .catch((error: Error) => {
                        reject(error);
                    });
            });
        });

        return promise;
    }
}

Object.seal(ScheduleModel);
export let model = new ScheduleModel();
