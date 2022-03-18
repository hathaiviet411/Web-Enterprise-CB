const Router = require('@koa/router');
const router = new Router();
const register = require('./register');
const category = require('./category');

router.use(register);
router.use(category);

module.exports = router.routes();
