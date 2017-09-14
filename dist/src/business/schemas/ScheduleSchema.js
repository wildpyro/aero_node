"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IntervalUnit = require("../enums/IntervalUnit");
/**
 * SQLite schema using sequelize
 * @param sequelize
 * @param dataTypes
 * @returns SequelizeStatic.Model<ScheduleInstance, ScheduleAttributes>
 */
let schema = function (sequelize, dataTypes) {
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
        description: {
            type: dataTypes.TEXT,
            allowNull: true
        },
        interval: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0 }
        },
        interval_unit: {
            type: dataTypes.TEXT,
            allowNull: false,
            values: IntervalUnit.values
        },
        duration: {
            type: dataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0 }
        },
        duration_unit: {
            type: dataTypes.TEXT,
            allowNull: false,
            values: IntervalUnit.values
        }
    };
    let options = {
        comment: 'table to hold schedule information',
        indexes: [],
        classMethods: {}
    };
    let schema = sequelize.define('schedule', columns, options);
    return schema;
};
exports.default = schema;
//# sourceMappingURL=ScheduleSchema.js.map