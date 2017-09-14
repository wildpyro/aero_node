"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../core/models/Database");
class ScheduleModel {
    create(scheduleAttributes) {
        let promise = new Promise((resolve, reject) => {
            Database_1.database.sequelize.transaction((t) => {
                return Database_1.database.models.schedule.create(scheduleAttributes)
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
    update(id, scheduleAttributes) {
        let options;
        options = {
            where: { id: id }
        };
        let promise = new Promise((resolve, reject) => {
            Database_1.database.sequelize.transaction((t) => {
                return Database_1.database.models.schedule.update(scheduleAttributes, options)
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
                return Database_1.database.models.schedule.destroy(options)
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
                return Database_1.database.models.schedule.findAll(options)
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
                return Database_1.database.models.schedule.find(options)
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
}
Object.seal(ScheduleModel);
exports.model = new ScheduleModel();
//# sourceMappingURL=ScheduleModel.js.map