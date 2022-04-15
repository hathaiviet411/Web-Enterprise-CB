const Router = require("@koa/router");

const router = new Router();
const controller = require("../../../controllers/main/service");

router.get("/zip", controller.downloadZip);

router.get("/csv", controller.downloadCsv);


module.exports = router.routes();
