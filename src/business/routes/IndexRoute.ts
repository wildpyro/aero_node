import * as express from 'express';
import { Request, Response } from 'express';

class IndexRoutes {

    public create(router: express.Router) {
        router.get('/', function (req: Request, res: Response) {
            res.render('index', {
                user: req.body.user || null,
                request: req
            });

            //res.send();
        });
    }
}

Object.seal(IndexRoutes);
export let route = new IndexRoutes();
