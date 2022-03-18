const Router = require('@koa/router');
const router = new Router();
<<<<<<< Updated upstream
const admin = require('./admin');
const QAM = require('./QA manager');
const auth = require('./auth/auth');
const passport = require('koa-passport');
const checkRole = require('../../middleware/checkRole');
require('../../middleware/passport');
=======
const admin = require("./admin");
const QAM = require("./QA manager")
const auth = require("./auth/auth");
const idea = require("./main/idea")
const passport = require("koa-passport");
const checkRole = require("../../middleware/checkRole");
require("../../middleware/passport");
>>>>>>> Stashed changes

// Auth api
router.use('/auth', auth);

// Admin api
router.use(
    '/admin',
    passport.authenticate('jwt-access', { failWithError: true }),
    checkRole.checkAdmin,
    admin
);

router.use(
    '/qamanager',
    passport.authenticate('jwt-access', { failWithError: true }),
    checkRole.checkQAM,
    QAM
);

<<<<<<< Updated upstream
=======
router.use(passport.authenticate("jwt-access", { failWithError: true }), idea)




>>>>>>> Stashed changes
module.exports = router.routes();
