"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../core/models/Database");
const GpioPins = require("../enums/GpioPin");
class GpioModel {
    create(gpioAttributes) {
        let promise = new Promise((resolve, reject) => {
            Database_1.database.sequelize.transaction((t) => {
                return Database_1.database.models.gpio.create(gpioAttributes)
                    .then((result) => {
                    resolve(result);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        });
        return promise;
    }
    update(id, pin, gpioAttributes) {
        let options;
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
        let promise = new Promise((resolve, reject) => {
            Database_1.database.sequelize.transaction((t) => {
                return Database_1.database.models.gpio.update(gpioAttributes, options)
                    .then((result) => {
                    if (result.length === 0) {
                        reject(new Error('No rows updated'));
                    }
                    else {
                        resolve(result.length);
                    }
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        });
        return promise;
    }
    delete(id) {
        let options;
        options = {
            where: { id: id }
        };
        let promise = new Promise((resolve, reject) => {
            Database_1.database.sequelize.transaction((t) => {
                return Database_1.database.models.gpio.destroy(options)
                    .then((result) => {
                    if (result === 0) {
                        reject(new Error('No rows deleted'));
                    }
                    else {
                        resolve(result);
                    }
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        });
        return promise;
    }
    findAll(where, orderBy) {
        let options;
        options = {
            where: where,
            order: orderBy
        };
        let promise = new Promise((resolve, reject) => {
            Database_1.database.sequelize.transaction((t) => {
                return Database_1.database.models.gpio.findAll(options)
                    .then((result) => {
                    resolve(result);
                })
                    .catch((error) => {
                    reject(error);
                });
            });
        });
        return promise;
    }
    findById(id) {
        let options;
        options = {
            where: { id: id }
        };
        let promise = new Promise((resolve, reject) => {
            Database_1.database.sequelize.transaction((t) => {
                return Database_1.database.models.gpio.find(options)
                    .then((result) => {
                    resolve(result);
                })
                    .catch((error) => {
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
        Database_1.database.sequelize.transaction((t) => {
            let promises = [];
            GpioPins.values.forEach(element => {
                let newGpio = { pin: element, scheduleName: '' };
                let options;
                options = {
                    where: { pin: element },
                    defaults: newGpio
                };
                let newPromise = Database_1.database.models.gpio.findOrCreate(options);
                promises.push(newPromise);
            });
            return Promise.all(promises);
        }).then(function () {
            return;
        }).catch(function (error) {
            console.log(error.message);
        });
    }
}
Object.seal(GpioModel);
exports.model = new GpioModel();
//# sourceMappingURL=GpioModel.js.map