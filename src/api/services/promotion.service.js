const { Promotion } = require('../../core/models');

module.exports = () => {
  return {
    async getAll() {
      const data = await Promotion.getAll();

      if (!data.length) {
        return { statusCode: 204, data };
      }

      return { statusCode: 200, data };
    },
    async get(id) {
      const data = await Promotion.fetch(id);
      if (!data) {
        return {
          statusCode: 404,
          data,
        };
      }
      return { statusCode: 200, data };
    },
    async create(body) {
      const exists = await Promotion.findBy({
        level_id: body.level_id,
        person_id: body.person_id,
      });

      if (exists) {
        return {
          statusCode: 409,
          data: {
            message: 'This promotion already exists',
          },
        };
      }

      return {
        statusCode: 201,
        data: await new Promotion(
          body.person_id,
          body.level_id,
          body.date,
          body.value,
          body.agreement
        ).save(),
      };
    },
  };
};
