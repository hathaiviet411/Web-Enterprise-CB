const Router = require('@koa/router');
const router = new Router();
const register = require('./register');
const category = require('./category');
const department = require('./department')

router.use(register);
router.use(category);
router.use(department);

module.exports = router.routes();
