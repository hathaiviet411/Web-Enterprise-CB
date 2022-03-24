const Router = require('@koa/router');
const router = new Router();
const controller = require("../../../controllers/main/register");

router.post("/register", controller.register);

router.get("/register", controller.getRegister)

module.exports = router.routes();
