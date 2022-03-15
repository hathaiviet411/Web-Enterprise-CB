const Router = require('@koa/router');
const router = new Router();
const api = require('./api')

router.use('/api', api)

module.exports = router.routes();