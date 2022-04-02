const Router = require('@koa/router');
const router = new Router();
const controller = require('../../../controllers/main/like');

router.post('/like', controller.like);

router.delete('/unlike', controller.unlike);

router.post('/dislike', controller.dislike);

router.delete('/undislike', controller.undislike);

module.exports = router.routes();