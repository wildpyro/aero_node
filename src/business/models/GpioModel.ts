import {
    Transaction, UpdateOptions, DestroyOptions, FindOptions, FindOrInitializeOptions,
    TransactionIsolationLevels, TransactionTypes
} from 'sequelize';
import { GpioAttributes, GpioInstance } from '../schemas/GpioSchema';
import { database as DatabaseInstance } from '../../core/models/Database';
import * as GpioPins from '../enums/GpioPin';

class GpioModel {
    create(gpioAttributes: GpioAttributes): Promise<GpioInstance> {
        let promise = new Promise<GpioInstance>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.gpio.create(gpioAttributes)
                    .then((result: GpioInstance) => {
                        resolve(result);
                    })
                    .catch((error: Error) => {
                        reject(error);
                    });
            });
        });

        return promise;
    }

    update(id: number, pin: number, gpioAttributes: GpioAttributes): Promise<number> {

        let options: UpdateOptions;

        if (id !== null) {
            options = {
                where: { id: id }
            };
        }

        if (pin !== null) {
            options = {
                where: { pin: pin }
            };
        }

        let promise = new Promise<number>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.gpio.update(gpioAttributes, options)
                    .then((result: [number, Array<GpioInstance>]) => {
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
                return DatabaseInstance.models.gpio.destroy(options)
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

    findAll(where?: any, orderBy?: any): Promise<Array<GpioInstance>> {
        let options: FindOptions;
        options = {
            where: where,
            order: orderBy
        };

        let promise = new Promise<Array<GpioInstance>>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.gpio.findAll(options)
                    .then((result: Array<GpioInstance>) => {
                        resolve(result);
                    })
                    .catch((error: Error) => {
                        reject(error);
                    });
            });
        });

        return promise;
    }

    findById(id: number): Promise<GpioInstance> {

        let options: FindOptions;
        options = {
            where: { id: id }
        };

        let promise = new Promise<GpioInstance>((resolve: Function, reject: Function) => {
            DatabaseInstance.sequelize.transaction((t: Transaction) => {
                return DatabaseInstance.models.gpio.find(options)
                    .then((result: GpioInstance) => {
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
     * Find and create if the pin doesn't exist
     */
    findOrCreate() {
        DatabaseInstance.sequelize.transaction((t: Transaction) => {
            let promises = [];

            GpioPins.values.forEach(element => {
                let newGpio: GpioAttributes = <GpioAttributes>{ pin: element, scheduleName: '' };
                let options: FindOrInitializeOptions<GpioAttributes>;

                options = {
                    where: { pin: element },
                    defaults: newGpio
                };

                let newPromise = DatabaseInstance.models.gpio.findOrCreate(options);
                promises.push(newPromise);
            });
            return Promise.all(promises);
        }).then(function () {
            return;
        }).catch(function (error: Error) {
            console.log(error.message);
        });
    }
}

Object.seal(GpioModel);
export let model = new GpioModel();
