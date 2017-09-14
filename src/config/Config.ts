import * as fs from 'fs';
import * as path from 'path';
import { DatabaseInterface } from './interfaces/DBInterface';
import { ServerInterface } from './interfaces/ServerInterface';

class Config {
    databaseConfig: DatabaseInterface;
    serverConfig: ServerInterface;

    constructor() {
        this.parseDatabaseConfig();
        this.parseServerConfig();
    }

    private parseDatabaseConfig(): void {
        //let path = './tsDist/src/config/db_config.json';
        let config = path.join(__dirname, '/db_config.json');

        if (fs.existsSync(config)) {
            let data = fs.readFileSync(config, 'utf8');
            this.databaseConfig = JSON.parse(data);
        }
        else {
            console.log('could not find file: ' + path);
        }
    }

    private parseServerConfig(): void {
        let config = path.join(__dirname, './server_config.json');

        if (fs.existsSync(config)) {
            let data = fs.readFileSync(config, 'utf8');
            this.serverConfig = JSON.parse(data);
        }
        else {
            console.log('could not find file: ' + path);
        }
    }
}

export const configInstance = new Config();
