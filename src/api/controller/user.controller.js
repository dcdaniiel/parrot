const { UserService } = require('../services');
const { validateSchema } = require('../schemas');

module.exports = () => {
  const user = UserService();
  return {
    async create(ctx) {
      try {
        const { body } = ctx.request;

        await validateSchema('userCreate', body);

        ctx.body = await user.create(body);
        ctx.status = 201;
      } catch (e) {
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
    async login(ctx) {
      try {
        const { body } = ctx.request;

        await validateSchema('userLogin', body);

        const { statusCode, data } = await user.login(body);

        ctx.body = { data };
        ctx.status = statusCode;
      } catch (e) {
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
    async getAll(ctx) {
      try {
        const { statusCode, data } = await user.getAll();

        ctx.body = { data };
        ctx.status = statusCode;
      } catch (e) {
        console.log('ERROR:::', e);
        ctx.body = e.errors || e.detail;
        ctx.status = 400;
      }
    },
  };
};
