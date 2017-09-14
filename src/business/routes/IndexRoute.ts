import * as express from 'express';
import * as path from 'path';
import { Request, Response } from 'express';

class IndexRoutes {

    public create(router: express.Router) {
        router.get('/', function (req: Request, res: Response) {
            res.sendFile(path.join(__dirname, '../../../public/index.html'));
        });
    }
}

Object.seal(IndexRoutes);
export let route = new IndexRoutes();
