"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onOff = require("onoff");
const GpioModel_1 = require("../models/GpioModel");
class GpioController {
    /**
     * Create a record by its Id
     * @param req
     * @param res
     */
    create(req, res) {
        try {
            let request = req.body;
            GpioModel_1.model.create(request)
                .then((request) => {
                return res.status(201).send({ 'success': 'successfully created: ' + request.dataValues.scheduleName });
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
     * create a base gpio layout for a pi
     */
    static createBasePinLayout() {
        try {
            GpioModel_1.model.findOrCreate();
        }
        catch (e) {
            console.log(e);
        }
        return;
    }
    static assignTask(pin, scheduleName) {
        try {
            let where = { pin: pin };
            GpioModel_1.model.findAll(where)
                .then((results) => {
                let result = results[0];
                result.dataValues.scheduleName = scheduleName;
                GpioModel_1.model.update(null, pin, result.dataValues)
                    .then((numberUpdated) => {
                    return;
                })
                    .catch((error) => {
                    console.log(error);
                });
            })
                .catch((error) => {
                console.log(error);
            });
        }
        catch (e) {
            console.log(e);
        }
        return true;
    }
    /**
     * Delete a record by its Id
     * @param req
     * @param res
     */
    delete(req, res) {
        try {
            let id = req.params._id;
            GpioModel_1.model.delete(id)
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
     * And optionally those not currently assigned.
     * @param req
     * @param res
     */
    find(req, res) {
        let where = {};
        if (req.query.available !== undefined && !req.query.available) {
            where = { scheduleName: null };
        }
        if (req.query.pin !== undefined) {
            where = { pin: req.query.pin };
        }
        try {
            GpioModel_1.model.findAll(where)
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
            GpioModel_1.model.findById(id)
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
            GpioModel_1.model.update(id, null, request)
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
     * Activates the pin for a given amount of time.
     */
    run(pin, duration) {
        let pinOn = new onOff.Gpio(pin, 'out');
        pinOn.writeSync(1);
        setTimeout(function () {
            pinOn.writeSync(0);
            pinOn.unexport();
        }, duration);
    }
    /**
     * Kill all if necessary
     */
    static turnOffAll() {
        /*array.forEach(element => {

        });*/
    }
}
exports.GpioController = GpioController;
exports.GpioControllerInstance = new GpioController();
//# sourceMappingURL=GpioController.js.map