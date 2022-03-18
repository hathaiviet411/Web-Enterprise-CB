const Router = require('@koa/router');
const router = new Router();
const category = require('./category');

router.use(category);

module.exports = router.routes();
