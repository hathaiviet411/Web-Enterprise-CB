const Router = require("@koa/router");
const router = new Router();
const auth = require("./auth/auth");
const main = require("./main");
const passport = require("koa-passport");
const checkRole = require("../../middleware/checkRole");
const zipController = require("../../controllers/main/zip")
require("../../middleware/passport");


// Auth api
router.use("/auth", auth);

router.get('/csv', zipController.downloadCsv)

router.get("/zip", zipController.downloadZip)

router.use(
  passport.authenticate("jwt-access", {
    failWithError: true,
  }),
  main
);

module.exports = router.routes();
