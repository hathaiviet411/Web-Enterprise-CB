const Router = require("@koa/router");
const router = new Router();
const admin = require("../../../controllers/admin/register");

router.post("/register", admin.register);

router.get("/role", admin.getRole);

router.post("/role", admin.addRole);

router.delete("/role/:id", admin.deleteRole);

module.exports = router.routes();
