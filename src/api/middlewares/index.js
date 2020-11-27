const jwt = require('koa-jwt');

const jwtMiddleware = jwt({
  secret: process.env.JWT_SECRET,
  key: 'jwtdata',
});

const setRole = async (ctx, next) => {
  const { jwtdata } = ctx.state;
  let user;
  try {
    user = {
      id: jwtdata.id,
      role: ctx.state.roles[jwtdata.type],
    };
  } catch (e) {
    user = null;
  }

  ctx.state.user = user;

  return next();
};

const isAdminRole = async (ctx, next) => {
  const { user } = ctx.state;

  if (user.role !== 'admin') {
    ctx.status = 401;
    ctx.body = 'Unauthorized';
  }

  return next();
};

const handlerUserRole = async (ctx, next) => {
  const { user } = ctx.state;

  if (!user.role) {
    ctx.status = 401;
    ctx.body = 'Unauthorized';
    return;
  }

  return next();
};

module.exports = {
  jwtMiddleware,
  setRole,
  handlerUserRole,
  isAdminRole,
};
