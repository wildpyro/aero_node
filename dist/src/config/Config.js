"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Config {
    constructor() {
        this.parseDatabaseConfig();
        this.parseServerConfig();
    }
    parseDatabaseConfig() {
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
    parseServerConfig() {
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
exports.configInstance = new Config();
//# sourceMappingURL=Config.js.map