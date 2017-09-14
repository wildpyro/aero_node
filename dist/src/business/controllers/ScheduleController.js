"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleModel_1 = require("../models/ScheduleModel");
const TaskController_1 = require("./TaskController");
/**
 * Generic schedule controller
 */
class ScheduleController {
    /**
     * Create a record by its Id
     * @param req
     * @param res
     */
    create(req, res) {
        try {
            let pin = req.body.pin;
            let request = req.body;
            ScheduleModel_1.model.create(request)
                .then((result) => {
                TaskController_1.TaskController.generateTasks(pin, result)
                    .then((result) => {
                    res.status(201).send({ 'success': 'Schedule created' });
                })
                    .catch((errorMsg) => {
                    res.status(400).send({ 'error': errorMsg });
                });
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
            ScheduleModel_1.model.update(id, request)
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
     * Delete a record by its Id
     * @param req
     * @param res
     */
    delete(req, res) {
        try {
            let id = req.params._id;
            ScheduleModel_1.model.delete(id)
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
            ScheduleModel_1.model.findAll()
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
            ScheduleModel_1.model.findById(id)
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
}
exports.ScheduleController = ScheduleController;
exports.ScheduleControllerInstance = new ScheduleController();
//# sourceMappingURL=ScheduleController.js.map