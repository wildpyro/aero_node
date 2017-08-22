/**
 * Used for registering models in core/Database.ts
 */
import * as SequelizeStatic from 'sequelize';
import { DataTypes, Instance, Sequelize, DefineOptions, DefineAttributes } from 'sequelize';
import ScheduleSchema from '../schemas/ScheduleSchema';
import * as TaskStatus from '../enums/TaskStatus';

export interface TaskAttributes {
    id: number;
    name: string;
    scheduleId: number;
    status: TaskStatus.enums;
    start: Date;
    end: Date;
}

export interface TaskInstance extends Instance<TaskAttributes> {
    dataValues: TaskAttributes;
}

/**
 * SQLite schema using sequelize
 * Note that if you change the schema you need to purge the table and rebuild it.
 * @param sequelize
 * @param dataTypes
 * @returns SequelizeStatic.Model<TaskInstance, TaskAttributes>
 */
export default function (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<TaskInstance, TaskAttributes> {

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

    let options = <DefineOptions<TaskInstance>>{
        comment: 'table to hold Task information',
        indexes: [],
        classMethods: {}
    };

    let schema = sequelize.define<TaskInstance, TaskAttributes>('task', columns, options);

    schema.belongsTo(ScheduleSchema(sequelize, dataTypes));

    return schema;
}
