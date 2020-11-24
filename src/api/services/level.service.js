const { Level } = require('../../core/models');

module.exports = () => {
  return {
    async getAll() {
      const data = await Level.getPersist().getAll();

      return { data: data.map(({ id, name }) => ({ id, name })) };
    },
  };
};
