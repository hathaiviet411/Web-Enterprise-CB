const Router = require("@koa/router");
const router = new Router();
const admin = require("../../../controllers/admin/category");

router.get("/category", admin.getCategory);

router.put("/category/:id", admin.updateCategory);

module.exports = router.routes();