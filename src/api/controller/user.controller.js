const { UserService } = require('../services');
const { validateSchema } = require('../validators');

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
    async get(ctx) {
      try {
        const { id } = ctx.params;
        ctx.body = await user.get(id);
      } catch (e) {
        ctx.body = e.detail;
        ctx.status = 404;
      }
    },
    async update(ctx) {
      try {
        const { body } = ctx.request;
        const { id } = ctx.params;

        ctx.body = await user.update({ ...body, id });
        ctx.status = 201;
      } catch (e) {
        ctx.body = e.detail;
        ctx.status = 400;
      }
    },
    async del(ctx) {
      try {
        const { id } = ctx.params;
        ctx.body = await user.del(id);
        ctx.status = 200;
      } catch (e) {
        ctx.status = 400;
        ctx.body = e.detail;
      }
    },
  };
};
