import * as SequelizeStatic from 'sequelize';
import { ScheduleAttributes, ScheduleInstance } from '../schemas/ScheduleSchema';
import { TaskAttributes, TaskInstance } from '../schemas/TaskSchema';
import { GpioAttributes, GpioInstance } from '../schemas/GpioSchema';

/**
 * Sequelize all business models below.
 * When you add a new model add it here to expose it to the CRUD model
 * This does not register the models with sequelize. That happends in core/models/database
 */
export interface SequelizeModels {
    schedule: SequelizeStatic.Model<ScheduleInstance, ScheduleAttributes>;
    task: SequelizeStatic.Model<TaskInstance, TaskAttributes>;
    gpio: SequelizeStatic.Model<GpioInstance, GpioAttributes>;
}

class BusinessModels {
    models: SequelizeModels;
}

export const businessModels = new BusinessModels().models;
