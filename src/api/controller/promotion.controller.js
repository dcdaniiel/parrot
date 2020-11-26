const { PromotionService } = require('../services');

module.exports = () => {
  const promo = PromotionService();
  return {
    async getAll(ctx) {
      try {
        ctx.body = await promo.getAll();
        ctx.status = 200;
      } catch (e) {
        ctx.body = e.detail;
        ctx.status = 404;
      }
    },
    async get(ctx) {
      try {
        const { id } = ctx.params;
        const { statusCode, data } = await promo.get(id);
        ctx.body = data;
        ctx.status = statusCode;
      } catch (e) {
        ctx.body = e.detail;
        ctx.status = 404;
      }
    },
  };
};
