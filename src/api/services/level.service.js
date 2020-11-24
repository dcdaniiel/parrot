const { Level } = require('../../core/models');

module.exports = function LevelService() {
  return {
    async getAll() {
      const data = await Level.getPersist().getAll();

      return { data: data.map(({ id, name }) => ({ id, name })) };
    },
  };
};
