const Router = require('@koa/router');
const router = new Router();
<<<<<<< Updated upstream
const QAM = require('../../../controllers/QA manager/category');

router.get('/category', QAM.getCategory);

router.post('/category', QAM.createCategory);

router.delete('/category/:id', QAM.deleteCategory);
=======
const controller = require("../../../controllers/main/category");

router.get("/category", controller.getCategory);

router.post("/category", controller.createCategory);

router.delete("/category/:id", controller.deleteCategory);
>>>>>>> Stashed changes

module.exports = router.routes();
