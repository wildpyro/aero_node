import * as express from 'express';
import * as IndexController from '../controllers/IndexController';
import { ScheduleController, ScheduleControllerInstance } from '../controllers/ScheduleController';

class ScheduleRoutes {
    _controller: ScheduleController;

    constructor() {
        this._controller = ScheduleControllerInstance;
    }

    public create(router: express.Router) {
        let controller = this._controller;
        router.delete('/schedule/:_id', controller.delete);
        router.get('/schedule', controller.find);
        router.get('/schedule/:_id', controller.findById);
        router.post('/schedule', controller.create);
        router.put('/schedule/:_id', controller.update);
    }
}

Object.seal(ScheduleRoutes);
export let route = new ScheduleRoutes();
