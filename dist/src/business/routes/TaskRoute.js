"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskController_1 = require("../controllers/TaskController");
class TaskRoutes {
    constructor() {
        this._controller = TaskController_1.TaskControllerInstance;
    }
    create(router) {
        let controller = this._controller;
        router.delete('/Task/:_id', controller.delete);
        router.get('/Task', controller.find);
        router.get('/Task/:_id', controller.findById);
        router.post('/Task', controller.create);
        router.put('/Task/:_id', controller.update);
    }
}
Object.seal(TaskRoutes);
exports.route = new TaskRoutes();
//# sourceMappingURL=TaskRoute.js.map