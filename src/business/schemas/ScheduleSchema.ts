/**
 * Used for registering models in core/Database.ts
 */
import * as SequelizeStatic from 'sequelize';
import { DataTypes, Instance, Sequelize, DefineOptions, DefineAttributes } from 'sequelize';
import * as IntervalUnit from '../enums/IntervalUnit';

export interface ScheduleAttributes {
    id: number;
    name: string;
    description: string;
    interval: number;
    interval_unit: IntervalUnit.enums;
    duration: number;
    duration_unit: IntervalUnit.enums;
    gpio_pin: number;
}

export interface ScheduleInstance extends Instance<ScheduleAttributes> {
    dataValues: ScheduleAttributes;
}

/**
 * SQLite schema using sequelize
 * @param sequelize
 * @param dataTypes
 * @returns SequelizeStatic.Model<ScheduleInstance, ScheduleAttributes>
 */
let schema = function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<ScheduleInstance, ScheduleAttributes> {

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

    let options = <DefineOptions<ScheduleInstance>>{
        comment: 'table to hold schedule information',
        indexes: [],
        classMethods: {}
    };

    let schema = sequelize.define<ScheduleInstance, ScheduleAttributes>('schedule', columns, options);

    return schema;
};

export default schema;

