"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * SQLite schema using sequelize
 * Note that if you change the schema you need to purge the table and rebuild it.
 * @param sequelize
 * @param dataTypes
 * @returns SequelizeStatic.Model<GpioInstance, GpioAttributes>
 */
function default_1(sequelize, dataTypes) {
    let columns = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pin: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        scheduleName: {
            type: dataTypes.TEXT,
        }
    };
    let options = {
        comment: 'table to hold Gpio information',
        indexes: [],
        classMethods: {}
    };
    let schema = sequelize.define('gpio', columns, options);
    return schema;
}
exports.default = default_1;
//# sourceMappingURL=GpioSchema.js.map