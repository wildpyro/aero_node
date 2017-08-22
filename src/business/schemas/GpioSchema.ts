/**
 * Tracks which schedules/tasks are set to run on which gpio pins
 */
import * as SequelizeStatic from 'sequelize';
import { DataTypes, Instance, Sequelize, DefineOptions, DefineAttributes } from 'sequelize';
import * as GpioPins from '../enums/GpioPin';

export interface GpioAttributes {
    id: number;
    pin: GpioPins.Enums;
    scheduleName: string;
}

export interface GpioInstance extends Instance<GpioAttributes> {
    dataValues: GpioAttributes;
}

/**
 * SQLite schema using sequelize
 * Note that if you change the schema you need to purge the table and rebuild it.
 * @param sequelize
 * @param dataTypes
 * @returns SequelizeStatic.Model<GpioInstance, GpioAttributes>
 */
export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<GpioInstance, GpioAttributes> {
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

    let options = <DefineOptions<GpioInstance>>{
        comment: 'table to hold Gpio information',
        indexes: [],
        classMethods: {}
    };

    let schema = sequelize.define<GpioInstance, GpioAttributes>('gpio', columns, options);

    return schema;
}
