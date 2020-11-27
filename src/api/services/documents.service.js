const { Document } = require('../../core/models');

module.exports = () => {
  return {
    async getAll() {
      const data = await Document.getAll();

      if (!data.length) {
        return { statusCode: 204, data };
      }

      return { statusCode: 200, data };
    },
    async get(id) {
      const data = await Document.fetch(id);
      if (!data) {
        return {
          statusCode: 404,
          data,
        };
      }
      return { statusCode: 200, data };
    },
    async create(body) {
      const { person_id, type } = body;

      const exists = await Document.findBy({ person_id, type });

      if (exists) {
        return {
          statusCode: 409,
          data: {
            message: 'This document already exists!',
          },
        };
      }

      return {
        statusCode: 201,
        data: await new Document(
          body.person_id,
          body.type,
          body.number_doc
        ).save(),
      };
    },
  };
};
