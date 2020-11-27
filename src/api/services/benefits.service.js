const { Benefit } = require('../../core/models');

module.exports = () => {
  return {
    async getAll() {
      const data = await Benefit.getAll();

      if (!data.length) {
        return { statusCode: 204, data };
      }

      return { statusCode: 200, data };
    },
    async get(id) {
      const data = await Benefit.fetch(id);
      if (!data) {
        return {
          statusCode: 404,
          data,
        };
      }
      return { statusCode: 200, data };
    },
    async create(body) {
      return {
        statusCode: 201,
        data: await new Benefit(
          body.person_id,
          body.month_init,
          body.month_end,
          body.value,
          body.parcel,
          body.receipt
        ).save(),
      };
    },
  };
};
