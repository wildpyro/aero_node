import * as cls from 'continuation-local-storage';
import * as fs from 'fs';
import * as path from 'path';
import * as Sqlite3 from 'sqlite3';
import * as SequelizeStatic from 'sequelize';
import { Sequelize } from 'sequelize';
import { configInstance as config } from '../../../config/Config';
import { SequelizeModels } from '../../business/models/SequelizeBusinessModels';

// Construct a sequelize database connection and save state
class SequelizeDatabase {
    basename: string;
    models: SequelizeModels;
    sequelize: Sequelize;

    constructor() {
        this.basename = path.basename(module.filename);
        let dbConfig = config.databaseConfig;

        //Create the db if it doesn't exist
        const database = new Sqlite3.Database(dbConfig.database);

        (SequelizeStatic as any).cls = cls.createNamespace('sequelize-transaction');

        this.sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
        this.models = ({} as any);
        this.setModels();
    }

    setModels(): void {

        //Need to point to the compiled code because node doesn't support ES6
        let modelLocation = path.join(process.cwd(), 'tsDist/src/business/schemas');

        fs.readdirSync(modelLocation)
            .filter((file: string) => {
                return (!file.match(/js.map/));
            })
            .forEach((file: string) => {
                let resolvedPath = path.join(modelLocation, file);
                let model = this.sequelize.import(resolvedPath);
                this.models[(model as any).name] = model;
            });

        Object.keys(this.models)
            .forEach((modelName: string) => {
                if (typeof this.models[modelName].associate === 'function') {
                    this.models[modelName].associate(this.models);
                }
            });
    }
}

export const database = new SequelizeDatabase();
