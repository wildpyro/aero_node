import { DatabaseInterface } from './DBInterface';
import { ServerInterface } from './ServerInterface';

export interface ConfigInterface {
    databaseConfig: DatabaseInterface;
    serverConfig: ServerInterface;
}
