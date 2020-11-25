const Router = require('koa-router');
const { UserController } = require('../controller');

module.exports = (opts) => {
  const user = UserController();
  const router = new Router();

  router.post('/', user.create);
  router.post('/login', user.login);

  return router;
};
