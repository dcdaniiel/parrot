const { userCreate, userLogin } = require('./user.schema');

const schemas = {
  userCreate,
  userLogin,
};

const validateSchema = async (schema, obj) => {
  return schemas[schema].validate(obj);
};

module.exports = { validateSchema };
