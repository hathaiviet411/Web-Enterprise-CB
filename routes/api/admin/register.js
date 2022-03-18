const Router = require('@koa/router');
const router = new Router();
<<<<<<< Updated upstream
const admin = require('../../../controllers/admin/register');

router.post('/register', admin.register);

router.get('/role', admin.getRole);

router.post('/role', admin.addRole);

router.delete('/role/:id', admin.deleteRole);
=======
const controller = require("../../../controllers/main/register");

router.post("/register", controller.register);

router.get("/role", controller.getRole);

router.post("/role", controller.addRole);

router.delete("/role/:id", controller.deleteRole);
>>>>>>> Stashed changes

module.exports = router.routes();
