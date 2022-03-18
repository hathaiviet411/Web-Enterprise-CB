const Router = require('@koa/router');
const router = new Router();
const controller = require("../../../controllers/main/register");

router.post("/register", controller.register);

router.get("/role", controller.getRole);

router.post("/role", controller.addRole);

router.delete("/role/:id", controller.deleteRole);

module.exports = router.routes();
