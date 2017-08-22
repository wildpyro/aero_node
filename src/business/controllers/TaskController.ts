import * as express from 'express';
import * as moment from 'moment';
import * as cron from 'node-schedule';
import { GpioController, GpioControllerInstance } from './GpioController';
import { TaskAttributes, TaskInstance } from '../schemas/TaskSchema';
import { ScheduleInstance } from '../schemas/ScheduleSchema';
import { model } from '../models/TaskModel';
import * as TaskStatus from '../enums/TaskStatus';
import * as IntervalUnit from '../enums/IntervalUnit';

/**
 * Execute a given task either based on a Task or manually
 */
export class TaskController {

    /**
     * Create a record by its Id
     * @param req
     * @param res
     */
    create(req: express.Request, res: express.Response): void {
        try {
            let request: TaskAttributes = <TaskAttributes>req.body;

            model.create(request)
                .then((request: TaskInstance) => {
                    return res.status(201).send({ 'success': 'successfully created: ' + request.dataValues.name });
                })
                .catch((error: Error) => {
                    res.status(400).send({ 'error': error.message });
                });
        } catch (e) {
            console.log(e);
            res.status(500).send({ 'error': 'error in your request' });
        }
    }


    /**
     * Delete a record by its Id
     * @param req
     * @param res
     */
    delete(req: express.Request, res: express.Response): void {
        try {

            let id: number = req.params._id;

            model.delete(id)
                .then((numberDelete: number) => {
                    res.send({ 'success': 'successfully deleted _id: ' + id });
                })
                .catch((error: Error) => {
                    res.status(400).send({ 'error': error.message });
                });
        } catch (e) {
            console.log(e);
            res.status(500).send({ 'error': 'error in your request' });
        }
    }

    /**
     * Find all records
     * @param req
     * @param res
     */
    find(req: express.Request, res: express.Response): void {
        try {
            model.findAll()
                .then((result: Array<TaskInstance>) => {
                    res.send(result);
                })
                .catch((error: Error) => {
                    res.status(400).send({ 'error': error });
                });
        } catch (e) {
            console.log(e);
            res.status(500).send({ 'error': 'error in your request' });
        }
    }

    /**
     * Find a single record by Id
     * @param req
     * @param res
     */
    findById(req: express.Request, res: express.Response): void {
        try {
            let id: number = req.params._id;

            model.findById(id)
                .then((result: TaskInstance) => {
                    res.send(result);
                })
                .catch((error: Error) => {
                    res.status(400).send({ 'error': error.message });
                });
        } catch (e) {
            console.log(e);
            res.status(500).send({ 'error': 'error in your request' });
        }
    }

    /**
     * Update a record by its Id
     * @param req
     * @param res
     */
    update(req: express.Request, res: express.Response): void {
        try {
            let id: number = req.params._id;
            let request: TaskAttributes = <TaskAttributes>req.body;

            model.update(id, request)
                .then((numberUpdated: number) => {
                    res.send({ 'success': 'successfully updated id: ' + id });
                })
                .catch((error: Error) => {
                    res.status(400).send({ 'error': error.message });
                });
        } catch (e) {
            console.log(e);
            res.status(500).send({ 'error': 'error in your request' });
        }
    }

    /**
     * Attempt to stop the current task
     */
    requestStop(): boolean {
        return true;
    }

    /**
     * get a list of upcoming tasks
     * @param req
     * @param res
     */
    getUpcoming(req: express.Request, res: express.Response): void {
        try {
            let where = { status: 'active' };
            let orderBy = { interval: -1 };

            model.findAll({ orderBy: orderBy })
                .then((result: Array<TaskInstance>) => {
                    res.send(result);
                })
                .catch((error: Error) => {
                    res.status(400).send({ 'error': error });
                });
        } catch (e) {
            console.log(e);
            res.status(500).send({ 'error': 'error in your request' });
        }
    }

    /**
     * Create a job based on a recurrence and a scheduled job
     * @param interval
     * @param interval_unit
     */
    static createJob(
        interval: number, interval_unit: string, duration: number, scheduleName: string,
        pin: number): cron.RecurrenceRule | cron.RecurrenceSpecDateRange {

        let job: cron.RecurrenceRule | cron.RecurrenceSpecDateRange;
        job = new cron.RecurrenceRule();

        switch (interval_unit) {
            case IntervalUnit.enums.second: {
                job.second = interval;
                break;
            }
            case IntervalUnit.enums.minute: {
                job.minute = interval;
                break;
            }
            case IntervalUnit.enums.hour: {
                job.hour = interval;
                break;
            }
            case IntervalUnit.enums.day: {
                job.hour = (interval * 24);
                break;
            }
            case IntervalUnit.enums.week:
                job.hour = (interval * 24 * 7);
                break;
            case IntervalUnit.enums.month: {
                job.month = interval;
                break;
            }
        }

        GpioController.assignTask(pin, scheduleName);

        let jobStart = cron.scheduleJob(job, function () {
            let task = GpioControllerInstance.run(pin, duration);
        });

        return job;
    }

    static generateTasks(pin: number, schedule: ScheduleInstance): Promise<string> {
        let interval = Number(schedule.dataValues.interval);
        let duration = Number(schedule.dataValues.duration);
        let interval_unit = schedule.dataValues.interval_unit;
        let duration_unit = schedule.dataValues.duration_unit;

        let promise = new Promise<string>((resolve: Function, reject: Function) => {

            //Validation to enusre that interval can't be bigger than duration
            if (interval <= duration && interval_unit === duration_unit) {
                reject('Duration cannot be greater than interval');
            }

            if (duration_unit === null) {

                if (IntervalUnit.Duration.requiresDuration(interval_unit[1])) {
                    reject('Duration unit is mandatory for selected interval');
                }

                if (IntervalUnit.Duration.validDuration(duration_unit)) {
                    reject('Not a valid duration');
                }
            }

            TaskController.createJob(interval, interval_unit, IntervalUnit.Duration.convert(duration, duration_unit), schedule.dataValues.name, pin);

            try {
                let request: TaskAttributes = <TaskAttributes>{
                    scheduleId: schedule.dataValues.id,
                    name: schedule.dataValues.name,
                    status: TaskStatus.enums.active,
                    start: new Date(),
                    end: null
                };

                model.create(request)
                    .then((request: TaskInstance) => {
                        resolve('Tasks created');
                    })
                    .catch((error: Error) => {
                        reject(error.message);
                    });
            } catch (e) {
                console.log(e);
                reject('task create failed');
            }
        });

        return promise;
    }
}

export let TaskControllerInstance = new TaskController();
