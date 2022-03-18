const Router = require('@koa/router');
const router = new Router();
const controller = require("../../../controllers/main/category");

router.get("/category", controller.getCategory);

router.put("/category/:id", controller.updateCategory);

router.post("/category", controller.createCategory);

router.delete("/category/:id", controller.deleteCategory);

module.exports = router.routes();
