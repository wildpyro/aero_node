import * as fs from 'fs';
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
        let path = './config/db_config.json';

        if (fs.existsSync(path)) {
            let data = fs.readFileSync(path, 'utf8');
            this.databaseConfig = JSON.parse(data);
        }
        else {
            console.log('could not find file: ' + path);
        }
    }

    private parseServerConfig(): void {
        let path = './config/server_config.json';

        if (fs.existsSync(path)) {
            let data = fs.readFileSync(path, 'utf8');
            this.serverConfig = JSON.parse(data);
        }
        else {
            console.log('could not find file: ' + path);
        }
    }
}

export const configInstance = new Config();
