const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const router = require('./routes');
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

  PersistorProvider.getPersistor();

  const routes = router({
    corsOptions,
  });

  app.on('error', (err, ctx) => {
    console.log('Server Error!: ', err, ctx);
  });

  // app.use(
  //   jwt({
  //     secret: process.env.JWT_SECRET,
  //   }).unless({
  //     path: [/.*\/auth.*/, /.*\/users.*/],
  //   })
  // )

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
    console.log(`Parrot server is running\nDate: ${new Date().toISOString()}`);
  });
};

module.exports = { startServer };
