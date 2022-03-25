const Router = require('@koa/router');
const router = new Router();
const idea = require("./idea")

router.use(idea);


module.exports = router.routes();