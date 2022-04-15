const Router = require("@koa/router");
const router = new Router();
const idea = require("./idea");
const user = require("./user");
const category = require("./category");
const department = require("./department");
const role = require("./role");
const like = require("./like");
const chart = require("./chart")

router.use(user);
router.use(chart)
router.use(category);
router.use(department);
router.use(role);
router.use(idea);
router.use(like);

module.exports = router.routes();
