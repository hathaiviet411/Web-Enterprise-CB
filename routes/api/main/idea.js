const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/main/idea");
const multer = require("../../../middleware/multer");

router.get("/idea", controller.getIdea);

router.get("/idea/:id", controller.getIdeaComment);

router.post(
  "/idea",
  multer.fields([{ name: "ideaFile" }, { name: "ideaPicture", maxCount: 1 }]),
  controller.createIdea
);

router.put(
  "/idea/:id",
  multer.fields([{ name: "ideaFile" }]),
  controller.updateIdea
);

router.delete("/idea/:id", controller.deleteIdea);

router.post("/idea/term/", controller.agreeTerm);

module.exports = router.routes();
