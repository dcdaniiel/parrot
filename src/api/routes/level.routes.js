const Router = require('koa-router');
const { LevelController } = require('../controller');

const level = LevelController();
const router = new Router();

router.get('/', level.getAll);

module.exports = router;
