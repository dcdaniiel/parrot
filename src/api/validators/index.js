const { userSchema, userCreate } = require('./user.schema');

const schemas = {
  userSchema,
  userCreate,
};

const validateSchema = async (schema, obj) => {
  return schemas[schema].validate(obj);
};

module.exports = { validateSchema };
