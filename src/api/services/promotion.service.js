const { Promotion } = require('../../core/models');

module.exports = () => {
  return {
    async getAll() {
      const data = await Promotion.getAll();

      return { data };
    },
    async get(id) {
      const data = await Promotion.fetch(id);

      return { data };
    },
  };
};
