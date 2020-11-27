const { DocumentsService } = require('../services');
const { validateSchema } = require('../schemas');

module.exports = () => {
  const doc = DocumentsService();
  return {
    async getAll(ctx) {
      try {
        const { statusCode, data } = await doc.getAll();
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
        const { statusCode, data } = await doc.get(id);
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

        await validateSchema('docCreate', body);

        const { statusCode, data } = await doc.create(body);

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
