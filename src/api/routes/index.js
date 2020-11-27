const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const UserRoutes = require('./user.routes');
const LevelRoutes = require('./level.routes');
const PromotionRoutes = require('./promotions.routes');
const BenefitsRoutes = require('./benefits.routes');
const DocumentsRoutes = require('./documents.routes');

module.exports = (opts) => {
  const router = Router({ prefix: '/api' });
  router.use(bodyParser());
  router.use('/users', UserRoutes(opts).routes());
  router.use('/levels', LevelRoutes(opts).routes());
  router.use('/promotions', PromotionRoutes(opts).routes());
  router.use('/benefits', BenefitsRoutes(opts).routes());
  router.use('/documents', DocumentsRoutes(opts).routes());
  return [router.routes()];
};
