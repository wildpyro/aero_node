"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron = require("node-schedule");
const GpioController_1 = require("./GpioController");
const TaskModel_1 = require("../models/TaskModel");
const TaskStatus = require("../enums/TaskStatus");
const IntervalUnit = require("../enums/IntervalUnit");
/**
 * Execute a given task either based on a Task or manually
 */
class TaskController {
    /**
     * Create a record by its Id
     * @param req
     * @param res
     */
    create(req, res) {
        try {
            let request = req.body;
            TaskModel_1.model.create(request)
                .then((request) => {
                return res.status(201).send({ 'success': 'successfully created: ' + request.dataValues.name });
            })
                .catch((error) => {
                res.status(400).send({ 'error': error.message });
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ 'error': 'error in your request' });
        }
    }
    /**
     * Delete a record by its Id
     * @param req
     * @param res
     */
    delete(req, res) {
        try {
            let id = req.params._id;
            TaskModel_1.model.delete(id)
                .then((numberDelete) => {
                res.send({ 'success': 'successfully deleted _id: ' + id });
            })
                .catch((error) => {
                res.status(400).send({ 'error': error.message });
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ 'error': 'error in your request' });
        }
    }
    /**
     * Find all records
     * @param req
     * @param res
     */
    find(req, res) {
        try {
            TaskModel_1.model.findAll()
                .then((result) => {
                res.send(result);
            })
                .catch((error) => {
                res.status(400).send({ 'error': error });
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ 'error': 'error in your request' });
        }
    }
    /**
     * Find a single record by Id
     * @param req
     * @param res
     */
    findById(req, res) {
        try {
            let id = req.params._id;
            TaskModel_1.model.findById(id)
                .then((result) => {
                res.send(result);
            })
                .catch((error) => {
                res.status(400).send({ 'error': error.message });
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ 'error': 'error in your request' });
        }
    }
    /**
     * Update a record by its Id
     * @param req
     * @param res
     */
    update(req, res) {
        try {
            let id = req.params._id;
            let request = req.body;
            TaskModel_1.model.update(id, request)
                .then((numberUpdated) => {
                res.send({ 'success': 'successfully updated id: ' + id });
            })
                .catch((error) => {
                res.status(400).send({ 'error': error.message });
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ 'error': 'error in your request' });
        }
    }
    /**
     * Attempt to stop the current task
     */
    requestStop() {
        return true;
    }
    /**
     * get a list of upcoming tasks
     * @param req
     * @param res
     */
    getUpcoming(req, res) {
        try {
            let where = { status: 'active' };
            let orderBy = { interval: -1 };
            TaskModel_1.model.findAll({ orderBy: orderBy })
                .then((result) => {
                res.send(result);
            })
                .catch((error) => {
                res.status(400).send({ 'error': error });
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ 'error': 'error in your request' });
        }
    }
    /**
     * Create a job based on a recurrence and a scheduled job
     * @param interval
     * @param interval_unit
     */
    static createJob(interval, interval_unit, duration, scheduleName, pin) {
        let job;
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
        GpioController_1.GpioController.assignTask(pin, scheduleName);
        let jobStart = cron.scheduleJob(job, function () {
            let task = GpioController_1.GpioControllerInstance.run(pin, duration);
        });
        return job;
    }
    static generateTasks(pin, schedule) {
        let interval = Number(schedule.dataValues.interval);
        let duration = Number(schedule.dataValues.duration);
        let interval_unit = schedule.dataValues.interval_unit;
        let duration_unit = schedule.dataValues.duration_unit;
        let promise = new Promise((resolve, reject) => {
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
                let request = {
                    scheduleId: schedule.dataValues.id,
                    name: schedule.dataValues.name,
                    status: TaskStatus.enums.active,
                    start: new Date(),
                    end: null
                };
                TaskModel_1.model.create(request)
                    .then((request) => {
                    resolve('Tasks created');
                })
                    .catch((error) => {
                    reject(error.message);
                });
            }
            catch (e) {
                console.log(e);
                reject('task create failed');
            }
        });
        return promise;
    }
}
exports.TaskController = TaskController;
exports.TaskControllerInstance = new TaskController();
//# sourceMappingURL=TaskController.js.map