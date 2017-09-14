"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const chalk = require("chalk");
const express = require("express");
const path = require("path");
const async = require("async");
const Database_1 = require("./core/models/Database");
const Config_1 = require("./config/Config");
const indexRoute = require("./business/routes/IndexRoute");
const scheduleRoute = require("./business/routes/ScheduleRoute");
const taskRoute = require("./business/routes/TaskRoute");
const gpioRoute = require("./business/routes/GpioRoute");
const GpioController_1 = require("./business/controllers/GpioController");
/**
 * Initialize an express instance with all the fixings
 */
class App {
    constructor() {
        this.setConfig();
        this.port = this.config.serverConfig.port;
        this.express = express();
        this.setBodyParser();
        this.resolveRoutes();
        this.setDBConnection();
        this.setUIDeployment();
        GpioController_1.GpioController.createBasePinLayout();
    }
    setBodyParser() {
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));
        this.express.use(bodyParser.json());
    }
    setConfig() {
        this.config = Config_1.configInstance;
    }
    /**
     * Set the connection to the database and sync the models
     */
    setDBConnection() {
        let models = Database_1.database.models;
        Database_1.database.sequelize.sync();
    }
    /**
     * Set the angular distribution
     */
    setUIDeployment() {
        this.express.set('view engine', 'html');
        this.express.use(express.static(path.join(__dirname, '../public')));
    }
    /**
     * initialize all the routes and verify they exist
     */
    resolveRoutes() {
        let router;
        router = express.Router();
        //Add each one of these?
        indexRoute.route.create(router);
        scheduleRoute.route.create(router);
        taskRoute.route.create(router);
        gpioRoute.route.create(router);
        this.express.use(router);
    }
}
async.waterfall([
    function (callback) {
        let app = new App();
        callback(null, app);
    },
    function (app, callback) {
        app.express.listen(app.port, () => {
            console.log(chalk.white('Aero_Node is up and running at localhost:' + app.port + ' try not to hurt yourself'));
        });
        callback(null, app);
    }
], function (error, app) {
    if (error) {
        console.log(chalk.red('error loading your app'));
    }
});
//# sourceMappingURL=server.js.map