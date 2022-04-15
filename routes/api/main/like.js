const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/main/like");

router.post("/like", controller.like);

router.delete("/unlike/:id", controller.unlike);

router.post("/dislike", controller.dislike);

router.delete("/undislike/:id", controller.undislike);

module.exports = router.routes();
