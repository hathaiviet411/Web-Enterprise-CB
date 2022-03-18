const Router = require('@koa/router');
const router = new Router();
<<<<<<< Updated upstream
const admin = require('../../../controllers/admin/category');

router.get('/category', admin.getCategory);

router.put('/category/:id', admin.updateCategory);

router.post('/category', admin.createCategory);

router.delete('/category/:id', admin.deleteCategory);
=======
const controller = require("../../../controllers/main/category");

router.get("/category", controller.getCategory);

router.put("/category/:id", controller.updateCategory);

router.post("/category", controller.createCategory);

router.delete("/category/:id", controller.deleteCategory);
>>>>>>> Stashed changes

module.exports = router.routes();
