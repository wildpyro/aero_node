import * as express from 'express';
import { ScheduleAttributes, ScheduleInstance } from '../schemas/ScheduleSchema';
import { model } from '../models/ScheduleModel';
import { TaskController } from './TaskController';

/**
 * Generic schedule controller
 */
export class ScheduleController {

    /**
     * Create a record by its Id
     * @param req
     * @param res
     */
    create(req: express.Request, res: express.Response): void {
        try {

            let pin = req.body.pin;
            let request: ScheduleAttributes = <ScheduleAttributes>req.body;

            model.create(request)
                .then((result: ScheduleInstance) => {
                    TaskController.generateTasks(pin, result)
                        .then((result: string) => {
                            res.status(201).send({ 'success': 'Schedule created' });
                        })
                        .catch((errorMsg: string) => {
                            res.status(400).send({ 'error': errorMsg });
                        });
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
            let request: ScheduleAttributes = <ScheduleAttributes>req.body;

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
                .then((result: Array<ScheduleInstance>) => {
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
                .then((result: ScheduleInstance) => {
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
}

export let ScheduleControllerInstance = new ScheduleController();
