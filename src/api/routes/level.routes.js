const Router = require('koa-router');
const { LevelController } = require('../controller');
const { ApplyMiddlewares } = require('../utils');

module.exports = (opts) => {
  const level = LevelController();
  const router = new Router();

  ApplyMiddlewares(router, opts.middlewares);

  router.get('/', level.getAll);

  return router;
};
