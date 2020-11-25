const jwt = require('koa-jwt');

const jwtMiddleware = jwt({
  secret: process.env.JWT_SECRET,
  key: 'jwtdata',
});

const setRole = async (ctx, next) => {
  const { jwtdata } = ctx.state;

  ctx.state.user = {
    user: jwtdata.id,
    role: jwtdata.type,
  };

  return next();
};

module.exports = {
  jwtMiddleware,
  setRole,
};
