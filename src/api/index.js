const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const router = require('./routes');
const { jwtMiddleware, setRole, handlerUserRole } = require('./middlewares');
const { PersistorProvider } = require('../core/persist');

const corsOptions = {
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

const startServer = async (port = 4000) => {
  const app = new Koa();
  app.use(cors(corsOptions));
  app.use(logger());

  const persistor = PersistorProvider.getPersistor();
  const roles = await persistor.getPersistInstance('Role').getAll();

  app.use(async (ctx, next) => {
    ctx.state.roles = roles.reduce(
      (acc, { id, name }) => ({ ...acc, [id]: name }),
      {}
    );
    return next();
  });
  const routes = router({
    corsOptions,
    middlewares: [jwtMiddleware, setRole, handlerUserRole],
  });

  app.on('error', (err, ctx) => {
    console.warn('Server Error!: ', err, ctx);
  });

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      ctx.status = 500;
      if (error && error.status) {
        ctx.status = error.status;
      }
    }
  });

  routes.forEach((route) => {
    app.use(route);
  });

  return app.listen(port, () => {
    console.log(`Parrot server is running`);
  });
};

module.exports = { startServer };
