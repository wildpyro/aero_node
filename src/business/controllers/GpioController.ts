import * as express from 'express';
import * as onOff from 'onoff';
import { GpioAttributes, GpioInstance } from '../schemas/GpioSchema';
import { model } from '../models/GpioModel';
import * as GpioPins from '../enums/GpioPin';

export class GpioController {

    /**
     * Create a record by its Id
     * @param req
     * @param res
     */
    create(req: express.Request, res: express.Response): void {
        try {
            let request: GpioAttributes = <GpioAttributes>req.body;

            model.create(request)
                .then((request: GpioInstance) => {
                    return res.status(201).send({ 'success': 'successfully created: ' + request.dataValues.scheduleName });
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
     * create a base gpio layout for a pi
     */
    static createBasePinLayout() {
        try {
            model.findOrCreate();
        } catch (e) {
            console.log(e);
        }

        return;
    }

    static assignTask(pin: number, scheduleName: string): boolean {
        try {
            let where = { pin: pin };

            model.findAll(where)
                .then((results: Array<GpioInstance>) => {

                    let result = results[0];
                    result.dataValues.scheduleName = scheduleName;

                    model.update(null, pin, result.dataValues)
                        .then((numberUpdated: number) => {
                            return;
                        })
                        .catch((error: Error) => {
                            console.log(error);
                        });
                })
                .catch((error: Error) => {
                    console.log(error);
                });
        } catch (e) {
            console.log(e);
        }

        return true;
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
     * And optionally those not currently assigned.
     * @param req
     * @param res
     */
    find(req: express.Request, res: express.Response): void {
        let where = {};

        if (req.query.available !== undefined && !req.query.available) {
            where = { scheduleName: null };
        }

        if (req.query.pin !== undefined) {
            where = { pin: req.query.pin };
        }

        try {
            model.findAll(where)
                .then((result: Array<GpioInstance>) => {
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
                .then((result: GpioInstance) => {
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
            let request: GpioAttributes = <GpioAttributes>req.body;

            model.update(id, null, request)
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
     * Activates the pin for a given amount of time.
     */
    run(pin: number, duration: number) {
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

export let GpioControllerInstance = new GpioController();
