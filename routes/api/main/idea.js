const Router = require("@koa/router");
const router = new Router();
const controller = require("../../../controllers/main/idea")
const multer = require("../../../middleware/multer");


const admz = require('adm-zip')
const fs = require('fs');

router.get("/idea", controller.getIdea)

router.get("/idea/:id", controller.getIdeaComment)

router.post("/idea", multer.fields([{ name: 'ideaFile', }, { name: "ideaPicture", maxCount: 1 }]), controller.createIdea)

router.put("/idea/:id", multer.fields([{ name: 'ideaFile' }]), controller.updateIdea)

router.delete("/idea/:id", controller.deleteIdea)

router.post("/idea/term/", controller.agreeTerm)

router.get("/downloadFile", (ctx) => {
    const v2_path = `/Users/loivngoo/Greenwich/Web-Enterprise-CB/public/uploads/Business-Requirement-17fb07905be.docx`

    var to_zip = fs.readdirSync('/Users/loivngoo/Greenwich/Web-Enterprise-CB/public/uploads')

    var zp = new admz();
    zp.addLocalFile(v2_path)
    const file_after_download = 'downloaded_file.zip';
    const data = zp.toBuffer();


    ctx.response.set('Content-Type', 'application/octet-stream');
    ctx.response.set('Content-Disposition', `attachment; filename=${file_after_download}`);
    ctx.response.set('Content-Length', data.length);

    ctx.body = data


})

module.exports = router.routes();