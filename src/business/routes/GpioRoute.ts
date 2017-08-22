import * as express from 'express';
import * as IndexController from '../controllers/IndexController';
import { GpioController, GpioControllerInstance } from '../controllers/GpioController';

class GpioRoutes {
    _controller: GpioController;

    constructor() {
        this._controller = GpioControllerInstance;
    }

    public create(router: express.Router) {
        let controller = this._controller;
        router.delete('/gpio/:_id', controller.delete);
        router.get('/gpio', controller.find);
        router.get('/gpio/:_id', controller.findById);
        router.post('/gpio', controller.create);
        router.put('/gpio/:_id', controller.update);
    }
}

Object.seal(GpioRoutes);
export let route = new GpioRoutes();
