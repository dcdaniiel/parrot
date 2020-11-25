const Router = require('koa-router');
const { LevelController } = require('../controller');

module.exports = (opts) => {
  const level = LevelController();
  const router = new Router();

  router.get('/', level.getAll);

  return router;
};
