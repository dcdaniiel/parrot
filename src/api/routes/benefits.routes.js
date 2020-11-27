const Router = require('koa-router');
const { BenefitsController } = require('../controller');
const { ApplyMiddlewares } = require('../utils');

module.exports = (opts) => {
  const benefit = BenefitsController();
  const router = new Router();

  ApplyMiddlewares(router, opts.middlewares);

  router.get('/', benefit.getAll);
  router.post('/', benefit.create);
  router.get('/:id', benefit.get);

  return router;
};
