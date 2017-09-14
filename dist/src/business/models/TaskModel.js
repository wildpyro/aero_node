"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../../core/models/Database");
class TaskModel {
    create(TaskAttributes) {
        let promise = new Promise((resolve, reject) => {
            Database_1.database.sequelize.transaction((t) => {
                return Database_1.database.models.task.create(TaskAttributes)
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
     * Create a list of attributes from a schedule
     * @param TaskAttributes
     */
    bulkCreate(TaskAttributes) {
        let promise = new Promise((resolve, reject) => {
            Database_1.database.sequelize.transaction((t) => {
                return Database_1.database.models.task.bulkCreate(TaskAttributes)
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
    update(id, TaskAttributes) {
        let options;
        options = {
            where: { id: id }
        };
        let promise = new Promise((resolve, reject) => {
            Database_1.database.sequelize.transaction((t) => {
                return Database_1.database.models.task.update(TaskAttributes, options)
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
                return Database_1.database.models.task.destroy(options)
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
                return Database_1.database.models.task.findAll(options)
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
                return Database_1.database.models.task.find(options)
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
Object.seal(TaskModel);
exports.model = new TaskModel();
//# sourceMappingURL=TaskModel.js.map