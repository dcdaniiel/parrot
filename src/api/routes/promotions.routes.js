const Router = require('koa-router');
const { PromotionController } = require('../controller');
const { ApplyMiddlewares } = require('../utils');

module.exports = (opts) => {
  const promo = PromotionController();
  const router = new Router();

  ApplyMiddlewares(router, opts.middlewares);

  router.get('/', promo.getAll);
  router.post('/', promo.create);

  return router;
};
