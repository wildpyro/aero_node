import * as bodyParser from 'body-parser';
import * as chalk from 'chalk';
import * as express from 'express';
import * as path from 'path';
import * as async from 'async';
import * as sequelize from 'sequelize';
import * as fs from 'fs';
import { database as DatabaseInstance } from './core/models/Database';
import { ConfigInterface } from '../config/interfaces/ConfigInterface';
import { configInstance } from '../config/Config';
import * as scheduleRoute from './business/routes/ScheduleRoute';
import * as taskRoute from './business/routes/TaskRoute';
import * as gpioRoute from './business/routes/GpioRoute';
import { GpioController } from './business/controllers/GpioController';

/**
 * Initialize an express instance with all the fixings
 */
class App {

    express: express.Application;
    port: number;
    config: ConfigInterface;

    constructor(port: number) {
        this.port = port;
        this.express = express();
        this.setBodyParser();
        this.resolveRoutes();
        this.setDBConnection();
        GpioController.createBasePinLayout();
    }

    private setBodyParser(): void {
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));

        this.express.use(bodyParser.json());
    }

    private setConfig(): void {
        this.config = configInstance;
    }

    /**
     * Set the connection to the database and sync the models
     */
    private setDBConnection(): void {
        let models = DatabaseInstance.models;
        DatabaseInstance.sequelize.sync();
    }

	/**
	 * initialize all the routes and verify they exist
	 */
    private resolveRoutes(): void {

        let router: express.Router;
        router = express.Router();

        //Add each one of these?
        scheduleRoute.route.create(router);
        taskRoute.route.create(router);
        gpioRoute.route.create(router);

        this.express.use(router);
    }
}

async.waterfall([
    function (callback: any) {
        let app = new App(5000);
        callback(null, app);
    },
    function (app: App, callback: any) {
        app.express.listen(app.port, () => {
            console.log(chalk.white('Aero_Node is up and running at localhost:' + app.port + ' try not to hurt yourself'));
        });

        callback(null, app);
    }
],
    function (error: Error, app: App) {
        if (error) {
            console.log(chalk.red('error loading your app'));
        }
    }
);
