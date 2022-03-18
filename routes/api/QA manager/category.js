const Router = require('@koa/router');
const router = new Router();
const QAM = require('../../../controllers/QA manager/category');

router.get('/category', QAM.getCategory);

router.post('/category', QAM.createCategory);

router.delete('/category/:id', QAM.deleteCategory);

module.exports = router.routes();
