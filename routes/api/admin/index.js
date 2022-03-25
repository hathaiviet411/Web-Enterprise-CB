const Router = require('@koa/router');
const router = new Router();
const user = require('./user');
const category = require('./category');
const department = require('./department');
const role = require('./role');

router.use(user);
router.use(category);
router.use(department);
router.use(role);

module.exports = router.routes();
