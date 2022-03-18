const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/main/idea")
const multer = require("../../../middleware/multer");

router.get("/idea", controller.getIdea)

router.post("/idea", multer.fields([{ name: 'document' }]), controller.createIdea)

router.put("/idea/:id", multer.fields([{ name: 'document' }]), controller.updateIdea)

router.delete("/idea/:id", controller.deleteIdea)

module.exports = router.routes();