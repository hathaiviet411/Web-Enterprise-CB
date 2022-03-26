const Router = require('@koa/router');
const router = new Router();
const controller = require('../../../controllers/main/department');

router.get('/department', controller.getDepartment);

router.post('/department', controller.addDepartment);

router.delete('/department/:id', controller.deleteDepartment);

module.exports = router.routes();
