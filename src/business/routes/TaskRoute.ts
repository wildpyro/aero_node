import * as express from 'express';
import { TaskController, TaskControllerInstance } from '../controllers/TaskController';

class TaskRoutes {
    _controller: TaskController;

    constructor() {
        this._controller = TaskControllerInstance;
    }

    public create(router: express.Router) {
        let controller = this._controller;

        router.delete('/Task/:_id', controller.delete);
        router.get('/Task', controller.find);
        router.get('/Task/:_id', controller.findById);
        router.post('/Task', controller.create);
        router.put('/Task/:_id', controller.update);
    }
}

Object.seal(TaskRoutes);
export let route = new TaskRoutes();
