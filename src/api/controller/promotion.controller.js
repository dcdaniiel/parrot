const { PromotionService } = require('../services');
const { validateSchema } = require('../schemas');

module.exports = () => {
  const promo = PromotionService();
  return {
    async getAll(ctx) {
      try {
        const { statusCode, data } = await promo.getAll();
        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        ctx.body = e.detail;
        ctx.status = 404;
      }
    },
    async get(ctx) {
      try {
        const { person_id } = ctx.params;
        const { statusCode, data } = await promo.get(person_id);
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

        await validateSchema('promotionCreate', body);

        const { statusCode, data } = await promo.create(body);

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
