const Router = require('@koa/router');
const router = new Router();
const passport = require('koa-passport');
const controller = require('../../../controllers/auth/auth');
require('../../../middleware/passport');

router.post(
    '/login',
    passport.authenticate('local', { failWithError: true }),
    controller.login
);

router.post(
    '/info',
    passport.authenticate('jwt-access', { failWithError: true }),
    controller.getInfo
);

router.post(
    '/token',
    passport.authenticate('jwt-refresh', { failWithError: true }),
    controller.getNewAccessToken
);

module.exports = router.routes();
