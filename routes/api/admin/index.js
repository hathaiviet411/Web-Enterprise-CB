const Router = require('@koa/router');
const router = new Router();
const register = require('./register');
const category = require('./category');
const department = require('./department');
const role = require('./role');

router.use(register);
router.use(category);
router.use(department);
router.use(role);

module.exports = router.routes();
