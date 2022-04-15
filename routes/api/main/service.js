const Router = require("@koa/router");

const router = new Router();
const controller = require("../../../controllers/main/service");

router.post("/zip", controller.downloadZip);

router.post("/csv", controller.downloadCsv);


module.exports = router.routes();
