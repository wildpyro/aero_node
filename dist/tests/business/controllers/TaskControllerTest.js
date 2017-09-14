"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron = require("node-schedule");
const TaskController_1 = require("../../../src/business/controllers/TaskController");
const jasmine_core_1 = require("jasmine-core");
describe('Create', function () {
    let ctrl = new TaskController_1.TaskController();
    //let test = expect(ctrl.create());
});
describe('createJob', function () {
    describe('second', function () {
        let rule = new cron.RecurrenceRule();
        rule.second = 1;
        let test = jasmine_core_1.expect(TaskController_1.TaskController.createJob(1, 'seconds', 1, 'test', 14)).to.be.equal(rule);
    });
    describe('minute', function () {
        let rule = new cron.RecurrenceRule();
        rule.minute = 1;
        let test = jasmine_core_1.expect(TaskController_1.TaskController.createJob(1, 'minutes', 1, 'test', 14)).to.be.equal(rule);
    });
    describe('hour', function () {
        let rule = new cron.RecurrenceRule();
        rule.hour = 1;
        let test = jasmine_core_1.expect(TaskController_1.TaskController.createJob(1, 'hours', 1, 'test', 14)).to.be.equal(rule);
    });
    describe('day', function () {
        let rule = new cron.RecurrenceRule();
        rule.hour = 24;
        let test = jasmine_core_1.expect(TaskController_1.TaskController.createJob(1, 'days', 1, 'test', 14)).to.be.equal(rule);
    });
    describe('week', function () {
        let rule = new cron.RecurrenceRule();
        rule.hour = 24 * 7;
        let test = jasmine_core_1.expect(TaskController_1.TaskController.createJob(1, 'weeks', 1, 'test', 14)).to.be.equal(rule);
    });
    describe('month', function () {
        let rule = new cron.RecurrenceRule();
        rule.month = 1;
        let test = jasmine_core_1.expect(TaskController_1.TaskController.createJob(1, 'months', 1, 'test', 14)).to.be.equal(rule);
    });
});
//# sourceMappingURL=TaskControllerTest.js.map