const Router = require('@koa/router');
const router = new Router();
const controller = require('../../../controllers/main/department');

router.get('/department', controller.getDepartment);

module.exports = router.routes();
