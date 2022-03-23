const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/main/comment")

router.post("/comment", controller.createComment)

router.put("/comment/:id", controller.updateComment)

router.delete("/comment/:id", controller.deleteComment)

module.exports = router.routes();