const { userCreate } = require('./user.schema');

const schemas = {
  userCreate,
};

const validateSchema = async (schema, obj) => {
  return schemas[schema].validate(obj);
};

module.exports = { validateSchema };
