const Router = require('koa-router');
const { DocumentsController } = require('../controller');
const { ApplyMiddlewares } = require('../utils');

module.exports = (opts) => {
  const doc = DocumentsController();
  const router = new Router();

  ApplyMiddlewares(router, opts.middlewares);

  router.get('/', doc.getAll);
  router.post('/', doc.create);
  router.get('/:id', doc.get);

  return router;
};
