import { Transaction, UpdateOptions, DestroyOptions, FindOptions } from 'sequelize';
import { TaskAttributes, TaskInstance } from '../schemas/TaskSchema';
import { database as DatabaseInstance } from '../../core/models/Database';

class TaskModel {
    create(TaskAttributes: TaskAttributes): Promise<TaskInstance> {
        let promise = new Promise<TaskInstance>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.task.create(TaskAttributes)
                    .then((result: TaskInstance) => {
                        resolve(result);
                    })
                    .catch((error: Error) => {
                        reject(error);
                    });
            });
        });

        return promise;
    }

    /**
     * Create a list of attributes from a schedule
     * @param TaskAttributes
     */
    bulkCreate(TaskAttributes: Array<TaskAttributes>): Promise<number> {
        let promise = new Promise<number>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.task.bulkCreate(TaskAttributes)
                    .then((result: Array<TaskInstance>) => {
                        resolve(result);
                    })
                    .catch((error: Error) => {
                        reject(error);
                    });
            });
        });

        return promise;
    }

    update(id: number, TaskAttributes: TaskAttributes): Promise<number> {

        let options: UpdateOptions;
        options = {
            where: { id: id }
        };

        let promise = new Promise<number>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.task.update(TaskAttributes, options)
                    .then((result: [number, Array<TaskInstance>]) => {
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
                return DatabaseInstance.models.task.destroy(options)
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

    findAll(where?: any, orderBy?: any): Promise<Array<TaskInstance>> {

        let options: FindOptions;
        options = {
            where: where,
            order: orderBy
        };

        let promise = new Promise<Array<TaskInstance>>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.task.findAll(options)
                    .then((result: Array<TaskInstance>) => {
                        resolve(result);
                    })
                    .catch((error: Error) => {
                        reject(error);
                    });
            });
        });

        return promise;
    }

    findById(id: number): Promise<TaskInstance> {

        let options: FindOptions;
        options = {
            where: { id: id }
        };

        let promise = new Promise<TaskInstance>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.task.find(options)
                    .then((result: TaskInstance) => {
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

Object.seal(TaskModel);
export let model = new TaskModel();
