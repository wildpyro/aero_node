"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleController_1 = require("../controllers/ScheduleController");
class ScheduleRoutes {
    constructor() {
        this._controller = ScheduleController_1.ScheduleControllerInstance;
    }
    create(router) {
        let controller = this._controller;
        router.delete('/schedule/:_id', controller.delete);
        router.get('/schedule', controller.find);
        router.get('/schedule/:_id', controller.findById);
        router.post('/schedule', controller.create);
        router.put('/schedule/:_id', controller.update);
    }
}
Object.seal(ScheduleRoutes);
exports.route = new ScheduleRoutes();
//# sourceMappingURL=ScheduleRoute.js.map