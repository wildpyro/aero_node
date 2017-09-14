"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleSchema_1 = require("../schemas/ScheduleSchema");
/**
 * SQLite schema using sequelize
 * Note that if you change the schema you need to purge the table and rebuild it.
 * @param sequelize
 * @param dataTypes
 * @returns SequelizeStatic.Model<TaskInstance, TaskAttributes>
 */
function default_1(sequelize, dataTypes) {
    // could type all this but I don't think I need to.
    let columns = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: dataTypes.INTEGER,
            allowNull: false
            //,values: TaskStatus.values can't get this to work properly
        },
        start: {
            type: dataTypes.DATE,
            allowNull: false
        },
        end: {
            type: dataTypes.DATE,
            allowNull: true
        }
    };
    let options = {
        comment: 'table to hold Task information',
        indexes: [],
        classMethods: {}
    };
    let schema = sequelize.define('task', columns, options);
    schema.belongsTo(ScheduleSchema_1.default(sequelize, dataTypes));
    return schema;
}
exports.default = default_1;
//# sourceMappingURL=TaskSchema.js.map