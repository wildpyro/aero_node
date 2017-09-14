"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class IndexRoutes {
    create(router) {
        router.get('/', function (req, res) {
            res.sendFile(path.join(__dirname, '../../../public/index.html'));
            /*res.render('index', {
                user: req.body.user || null,
                request: req
            });*/
            //res.send();
        });
    }
}
Object.seal(IndexRoutes);
exports.route = new IndexRoutes();
//# sourceMappingURL=IndexRoute.js.map