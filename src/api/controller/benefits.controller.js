const { BenefitsService } = require('../services');
const { validateSchema } = require('../schemas');

module.exports = () => {
  const benefits = BenefitsService();
  return {
    async getAll(ctx) {
      try {
        const { statusCode, data } = await benefits.getAll();
        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        ctx.body = e.detail;
        ctx.status = 404;
      }
    },
    async get(ctx) {
      try {
        const { id } = ctx.params;
        const { statusCode, data } = await benefits.get(id);
        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        ctx.body = e.detail;
        ctx.status = 404;
      }
    },
    async create(ctx) {
      try {
        const { body } = ctx.request;

        await validateSchema('benefitsCreate', body);

        const { statusCode, data } = await benefits.create(body);

        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        console.log('ERROR::: ', e);
        ctx.body = e.errors || e.detail || e;
        ctx.status = 404;
      }
    },
  };
};
