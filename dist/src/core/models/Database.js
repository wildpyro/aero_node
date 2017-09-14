"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cls = require("continuation-local-storage");
const fs = require("fs");
const path = require("path");
const Sqlite3 = require("sqlite3");
const SequelizeStatic = require("sequelize");
const Config_1 = require("./../../config/Config");
// Construct a sequelize database connection and save state
class SequelizeDatabase {
    constructor() {
        this.basename = path.basename(module.filename);
        let dbConfig = Config_1.configInstance.databaseConfig;
        //Create the db if it doesn't exist
        const database = new Sqlite3.Database(dbConfig.database);
        SequelizeStatic.cls = cls.createNamespace('sequelize-transaction');
        this.sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
        this.models = {};
        this.setModels();
    }
    setModels() {
        //TODO Need to point to the compiled code because node doesn't support ES6
        let modelLocation = path.join(process.cwd(), 'dist/src/business/schemas');
        fs.readdirSync(modelLocation)
            .filter((file) => {
            return (!file.match(/js.map/));
        })
            .forEach((file) => {
            let resolvedPath = path.join(modelLocation, file);
            let model = this.sequelize.import(resolvedPath);
            this.models[model.name] = model;
        });
        Object.keys(this.models)
            .forEach((modelName) => {
            if (typeof this.models[modelName].associate === 'function') {
                this.models[modelName].associate(this.models);
            }
        });
    }
}
exports.database = new SequelizeDatabase();
//# sourceMappingURL=Database.js.map