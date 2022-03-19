const Router = require('@koa/router');
const router = new Router();
const admin = require("./admin");
const QAM = require("./QA manager")
const auth = require("./auth/auth");
const idea = require("./main/idea")
const passport = require("koa-passport");
const checkRole = require("../../middleware/checkRole");
require("../../middleware/passport");

// Auth api
router.use('/auth', auth);

// Admin api
router.use(
    '/admin',
    passport.authenticate('jwt-access', {
        failWithError: true
    }),
    checkRole.checkAdmin,
    admin
);

router.use(
    '/qamanager',
    passport.authenticate('jwt-access', {
        failWithError: true
    }),
    checkRole.checkQAM,
    QAM
);

router.use(passport.authenticate("jwt-access", {
    failWithError: true
}), idea)




module.exports = router.routes();