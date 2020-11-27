const Router = require('koa-router');
const { UserController } = require('../controller');
const { ApplyMiddlewares } = require('../utils');

module.exports = (opts) => {
  const user = UserController();
  const router = new Router();

  router.post('/', user.create);
  router.post('/login', user.login);

  ApplyMiddlewares(router, opts.middlewares);

  router.get('/', user.getAll);
  router.get('/:id', user.get);

  return router;
};
