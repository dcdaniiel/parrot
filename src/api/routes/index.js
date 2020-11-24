const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const UserRoutes = require('./user.routes');
const LevelRoutes = require('./level.routes');

module.exports = (opts) => {
  const router = Router({ prefix: '/api' });
  router.use(bodyParser());
  router.use('/users', UserRoutes.routes());
  router.use('/levels', LevelRoutes.routes());

  return [router.routes()];
};
