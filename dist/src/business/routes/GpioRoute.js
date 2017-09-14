"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GpioController_1 = require("../controllers/GpioController");
class GpioRoutes {
    constructor() {
        this._controller = GpioController_1.GpioControllerInstance;
    }
    create(router) {
        let controller = this._controller;
        router.delete('/gpio/:_id', controller.delete);
        router.get('/gpio', controller.find);
        router.get('/gpio/:_id', controller.findById);
        router.post('/gpio', controller.create);
        router.put('/gpio/:_id', controller.update);
    }
}
Object.seal(GpioRoutes);
exports.route = new GpioRoutes();
//# sourceMappingURL=GpioRoute.js.map