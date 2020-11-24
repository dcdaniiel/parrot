const { LevelService } = require('../services');

module.exports = () => {
  const level = LevelService();
  return {
    async getAll(ctx) {
      try {
        ctx.body = await level.getAll();
        ctx.status = 200;
      } catch (e) {
        ctx.body = e.detail;
        ctx.status = 404;
      }
    },
  };
};
