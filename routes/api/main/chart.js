const Router = require('@koa/router');
const router = new Router();
const controller = require('../../../controllers/main/chart');

router.get('/chart/list-ideas-have-most-like', controller.getListIdeasHaveMostLike);
router.get('/chart/list-ideas-have-most-view', controller.getListIdeasHaveMostView);

router.get('/chart/get-dashboard-likes', controller.getDashboardLikes);

module.exports = router.routes();
