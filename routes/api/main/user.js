const Router = require('@koa/router');
const router = new Router();
const controller = require('../../../controllers/main/user');

router.post('/register', controller.register);

router.get('/user', controller.getAllUser)

router.get('/register', controller.getRegister);

module.exports = router.routes();
