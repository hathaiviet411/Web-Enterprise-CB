const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/main/idea")
const multer = require("../../../middleware/multer");

router.get("/idea/:page", controller.getIdea)

router.post("/idea", multer.fields([{ name: 'ideaFile' }]), controller.createIdea)

router.put("/idea/:id", multer.fields([{ name: 'ideaFile' }]), controller.updateIdea)

router.delete("/idea/:id", controller.deleteIdea)

router.post("/idea/term/:user", controller.agreeTerm)

module.exports = router.routes();